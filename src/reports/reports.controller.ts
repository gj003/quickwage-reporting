import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'format', enum: ['pdf', 'xlsx'], required: true })
  @ApiQuery({ name: 'title', required: false })
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
  @ApiQuery({ name: 'format', enum: ['pdf', 'xlsx'], required: true })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        rows: { type: 'array', items: { type: 'object' } },
      },
      required: ['rows'],
    },
  })
  async generate(
    @Query('format') format: ReportFormat,
    @Body() body: { title?: string; rows: Record<string, unknown>[] },
    @Res() res: Response,
  ) {
    const report = await this.reports.generate(body.rows, { format, title: body.title });
    this.send(res, report);
  }

  @Get('stream')
  @ApiQuery({ name: 'format', enum: ['pdf', 'xlsx'], required: true })
  @ApiQuery({ name: 'count', required: false, description: 'Number of fake rows (default 10000, max 1M)' })
  async stream(
    @Query('format') format: ReportFormat,
    @Query('count') count: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const total = Math.min(Math.max(Number(count ?? 10000), 1), 1_000_000);
    const options = { format, title: 'Large Report', filename: `large-${total}.${format}` };
    res.set(this.reports.headersFor(options));

    // Stop generating if the client goes away.
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
