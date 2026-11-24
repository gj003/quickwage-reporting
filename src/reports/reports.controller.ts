import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiProduces } from '@nestjs/swagger';
import type { Response } from 'express';
import { nanoid } from 'nanoid';
import { XlsxService } from './xlsx.service.js';
import { PdfService } from './pdf.service.js';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly xlsx: XlsxService,
    private readonly pdf: PdfService,
  ) {}

  @Get('xlsx')
  @ApiProduces('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  async xlsxReport(@Res() res: Response) {
    const buffer = await this.xlsx.buildReport([
      { id: nanoid(), name: 'Alice', amount: 1000 },
      { id: nanoid(), name: 'Bob', amount: 2500 },
    ]);
    res
      .set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="report-${nanoid(8)}.xlsx"`,
      })
      .send(buffer);
  }

  @Get('pdf')
  @ApiProduces('application/pdf')
  async pdfReport(@Res() res: Response) {
    const buffer = await this.pdf.buildReport('Sample Report', [
      { label: 'Total users', value: '1,245' },
      { label: 'Revenue', value: '$42,310' },
    ]);
    res
      .set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${nanoid(8)}.pdf"`,
      })
      .send(buffer);
  }
}
