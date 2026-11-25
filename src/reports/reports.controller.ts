import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { ReportService } from './report.service.js';
import type { ReportFormat } from './report.types.js';

async function* fakeRows(n: number, signal?: AbortSignal): AsyncGenerator<Record<string, unknown>> {
  for (let i = 0; i < n; i++) {
    if (signal?.aborted) return;
    yield {
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      department: faker.commerce.department(),
      salary: faker.number.int({ min: 40000, max: 180000 }),
      joined: faker.date.past({ years: 5 }).toISOString().slice(0, 10),
    };
  }
}

const sampleData = [
  { id: 1, name: 'Alice',   department: 'Engineering', salary: 95000, joined: '2023-04-12' },
  { id: 2, name: 'Bob',     department: 'Design',      salary: 72000, joined: '2022-08-01' },
  { id: 3, name: 'Charlie', department: 'Sales',       salary: 68000, joined: '2024-01-15' },
  { id: 4, name: 'Diana',   department: 'Engineering', salary: 110000, joined: '2021-11-30' },
];

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reports: ReportService) {}

  @Get('sample')
  @ApiOperation({
    summary: 'Download a sample report',
    description:
      'Generates a small hard-coded employee report in the requested format (pdf or xlsx) and returns it as a file download. Useful for quickly validating that the report pipeline is working end-to-end.',
  })
  @ApiQuery({ name: 'format', enum: ['pdf', 'xlsx'], required: true, description: 'Output file format.' })
  @ApiQuery({ name: 'title', required: false, description: 'Title printed on the report (defaults to "Employee Report").' })
  @ApiProduces('application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @ApiOkResponse({
    description: 'Binary file stream of the generated report. `Content-Disposition` is set to `attachment`.',
    content: {
      'application/pdf': { schema: { type: 'string', format: 'binary' } },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Unsupported `format` value.' })
  async sample(
    @Query('format') format: ReportFormat,
    @Query('title') title: string | undefined,
    @Res() res: Response,
  ) {
    const report = await this.reports.generate(sampleData, {
      format,
      title: title ?? 'Employee Report',
    });
    this.send(res, report);
  }

  @Post('generate')
  @ApiOperation({
    summary: 'Generate a report from a caller-supplied dataset',
    description:
      'Accepts an arbitrary array of row objects in the request body and returns the generated file. Column headers are inferred from the keys of the first row. The response is a binary download, not JSON.',
  })
  @ApiQuery({ name: 'format', enum: ['pdf', 'xlsx'], required: true, description: 'Output file format.' })
  @ApiBody({
    description:
      'Report payload. `rows` is required and must be a non-empty array of flat objects; every row should share the same keys.',
    schema: {
      type: 'object',
      required: ['rows'],
      properties: {
        title: { type: 'string', description: 'Shown on the PDF header / used as the xlsx sheet name.', example: 'Q4 Payroll' },
        rows: {
          type: 'array',
          description: 'Row objects. Keys of the first row become column headers.',
          items: { type: 'object', additionalProperties: true },
          example: [
            { id: 1, name: 'Alice', salary: 95000 },
            { id: 2, name: 'Bob', salary: 72000 },
          ],
        },
      },
    },
  })
  @ApiProduces('application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @ApiOkResponse({
    description: 'Binary file stream of the generated report.',
    content: {
      'application/pdf': { schema: { type: 'string', format: 'binary' } },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Missing/invalid `rows`, or unsupported `format`.' })
  async generate(
    @Query('format') format: ReportFormat,
    @Body() body: { title?: string; rows: Record<string, unknown>[] },
    @Res() res: Response,
  ) {
    const report = await this.reports.generate(body.rows, { format, title: body.title });
    this.send(res, report);
  }

  @Get('stream')
  @ApiOperation({
    summary: 'Stream a large synthetic report',
    description:
      'Generates up to 1,000,000 fake rows and streams them directly to the response with constant memory. xlsx output automatically splits across sheets at Excel row limits; pdf output paginates. Cancels generation if the client disconnects.',
  })
  @ApiQuery({ name: 'format', enum: ['pdf', 'xlsx'], required: true, description: 'Output file format.' })
  @ApiQuery({
    name: 'count',
    required: false,
    schema: { type: 'integer', minimum: 1, maximum: 1_000_000, default: 10_000 },
    description: 'Number of fake rows to generate. Clamped to [1, 1,000,000].',
  })
  @ApiProduces('application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @ApiOkResponse({
    description: 'Streamed binary file. Served with `Content-Disposition: attachment`.',
    content: {
      'application/pdf': { schema: { type: 'string', format: 'binary' } },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Unsupported `format` value.' })
  async stream(
    @Query('format') format: ReportFormat,
    @Query('count') count: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const total = Math.min(Math.max(Number(count ?? 10000), 1), 1_000_000);
    const options = { format, title: 'Large Report', filename: `large-${total}.${format}` };
    res.set(this.reports.headersFor(options));

    const ac = new AbortController();
    req.on('close', () => ac.abort());

    await this.reports.stream(fakeRows(total, ac.signal), res, options);
  }

  private send(res: Response, report: { buffer: Buffer; mimeType: string; filename: string }) {
    res
      .set({
        'Content-Type': report.mimeType,
        'Content-Disposition': `attachment; filename="${report.filename}"`,
        'Content-Length': report.buffer.length.toString(),
      })
      .send(report.buffer);
  }
}
