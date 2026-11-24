import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import type { Writable } from 'node:stream';
import { XlsxService } from './xlsx.service.js';
import { PdfService } from './pdf.service.js';
import { REPORT_MIME, type ReportOptions, type ReportResult } from './report.types.js';

type Row = Record<string, unknown>;

@Injectable()
export class ReportService {
  constructor(
    private readonly xlsx: XlsxService,
    private readonly pdf: PdfService,
  ) {}

  async generate(data: Row | Row[], options: ReportOptions): Promise<ReportResult> {
    const rows = Array.isArray(data) ? data : [data];
    const title = options.title ?? 'Report';
    const filename = options.filename ?? `report-${nanoid(8)}.${options.format}`;

    let buffer: Buffer;
    switch (options.format) {
      case 'xlsx':
        buffer = await this.xlsx.buildReport(rows, options.sheetName ?? title);
        break;
      case 'pdf':
        buffer = await this.pdf.buildTable(title, rows);
        break;
      default:
        throw new BadRequestException(`Unsupported format: ${String(options.format)}`);
    }

    return { buffer, mimeType: REPORT_MIME[options.format], filename };
  }

  /**
   * Stream a report directly to a Writable. Use for large datasets so memory
   * stays flat. Pair with Content-Type / Content-Disposition from `headersFor`.
   */
  async stream(
    rows: AsyncIterable<Row> | Iterable<Row>,
    out: Writable,
    options: ReportOptions,
  ): Promise<void> {
    const title = options.title ?? 'Report';
    switch (options.format) {
      case 'xlsx':
        await this.xlsx.streamReport(rows, out, options.sheetName ?? title);
        return;
      case 'pdf':
        await this.pdf.streamTable(title, rows, out);
        return;
      default:
        throw new BadRequestException(`Unsupported format: ${String(options.format)}`);
    }
  }

  headersFor(options: ReportOptions): { 'Content-Type': string; 'Content-Disposition': string } {
    const filename = options.filename ?? `report-${nanoid(8)}.${options.format}`;
    return {
      'Content-Type': REPORT_MIME[options.format],
      'Content-Disposition': `attachment; filename="${filename}"`,
    };
  }
}
