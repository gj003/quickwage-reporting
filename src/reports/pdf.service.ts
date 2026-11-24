import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import type { Writable } from 'node:stream';

type Row = Record<string, unknown>;

@Injectable()
export class PdfService {
  async buildTable(title: string, rows: Row[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 40, layout: 'landscape' });
      const chunks: Buffer[] = [];

      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(18).text(title, { align: 'center' }).moveDown(0.5);
      doc
        .fontSize(9)
        .fillColor('#666')
        .text(new Date().toISOString(), { align: 'right' })
        .fillColor('#000')
        .moveDown();

      if (rows.length === 0) {
        doc.fontSize(12).text('No data.', { align: 'center' });
        doc.end();
        return;
      }

      const columns = Object.keys(rows[0]);
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const colWidth = pageWidth / columns.length;
      const rowHeight = 20;
      let y = doc.y;

      const drawHeader = () => {
        doc.font('Helvetica-Bold').fontSize(10);
        columns.forEach((col, i) => {
          const x = doc.page.margins.left + i * colWidth;
          doc.rect(x, y, colWidth, rowHeight).fill('#f0f0f0').fillColor('#000');
          doc.text(col, x + 4, y + 6, { width: colWidth - 8, ellipsis: true });
        });
        y += rowHeight;
        doc.font('Helvetica').fontSize(9);
      };

      drawHeader();

      for (const row of rows) {
        if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          y = doc.page.margins.top;
          drawHeader();
        }
        columns.forEach((col, i) => {
          const x = doc.page.margins.left + i * colWidth;
          doc.rect(x, y, colWidth, rowHeight).stroke('#ddd');
          const value = row[col];
          const text = value === null || value === undefined ? '' : String(value);
          doc.fillColor('#000').text(text, x + 4, y + 6, { width: colWidth - 8, ellipsis: true });
        });
        y += rowHeight;
      }

      doc.end();
    });
  }

  /**
   * Streams a PDF directly to the given Writable. Columns are inferred from
   * the first row. Supports async iterables (e.g. a DB cursor).
   *
   * PDF is not suitable for very large datasets — 1M rows is ~25k pages.
   * `maxRows` protects callers from accidentally generating multi-GB files.
   */
  async streamTable(
    title: string,
    rows: AsyncIterable<Row> | Iterable<Row>,
    out: Writable,
    opts: { maxRows?: number } = {},
  ): Promise<void> {
    const maxRows = opts.maxRows ?? 50_000;
    const doc = new PDFDocument({ size: 'A4', margin: 40, layout: 'landscape' });
    doc.pipe(out);

    doc.fontSize(18).text(title, { align: 'center' }).moveDown(0.5);
    doc
      .fontSize(9)
      .fillColor('#666')
      .text(new Date().toISOString(), { align: 'right' })
      .fillColor('#000')
      .moveDown();

    const rowHeight = 20;
    let columns: string[] | null = null;
    let colWidth = 0;
    let y = doc.y;

    const drawHeader = () => {
      if (!columns) return;
      doc.font('Helvetica-Bold').fontSize(10);
      columns.forEach((col, i) => {
        const x = doc.page.margins.left + i * colWidth;
        doc.rect(x, y, colWidth, rowHeight).fill('#f0f0f0').fillColor('#000');
        doc.text(col, x + 4, y + 6, { width: colWidth - 8, ellipsis: true });
      });
      y += rowHeight;
      doc.font('Helvetica').fontSize(9);
    };

    let any = false;
    let count = 0;
    let truncated = false;
    let aborted = false;
    const onClose = () => {
      aborted = true;
    };
    out.on('close', onClose);

    for await (const row of rows) {
      if (aborted) break;
      if (count >= maxRows) {
        truncated = true;
        break;
      }
      any = true;
      count += 1;
      if (!columns) {
        columns = Object.keys(row);
        const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        colWidth = pageWidth / columns.length;
        drawHeader();
      }
      if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        y = doc.page.margins.top;
        drawHeader();
      }
      columns.forEach((col, i) => {
        const x = doc.page.margins.left + i * colWidth;
        doc.rect(x, y, colWidth, rowHeight).stroke('#ddd');
        const value = row[col];
        const text = value === null || value === undefined ? '' : String(value);
        doc.fillColor('#000').text(text, x + 4, y + 6, { width: colWidth - 8, ellipsis: true });
      });
      y += rowHeight;
    }

    if (!any) doc.fontSize(12).text('No data.', { align: 'center' });
    if (truncated) {
      doc
        .moveDown()
        .fillColor('#b00')
        .fontSize(10)
        .text(`Truncated to first ${maxRows.toLocaleString()} rows — use XLSX for the full dataset.`, {
          align: 'center',
        })
        .fillColor('#000');
    }

    doc.end();
    try {
      await new Promise<void>((resolve, reject) => {
        out.on('finish', resolve);
        out.on('error', reject);
        if (aborted) resolve();
      });
    } finally {
      out.off('close', onClose);
    }
  }
}
