import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  buildReport(title: string, rows: { label: string; value: string }[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(20).text(title, { align: 'center' }).moveDown();
      doc.fontSize(10).text(new Date().toISOString(), { align: 'right' }).moveDown();

      rows.forEach((row) => {
        doc.fontSize(12).text(`${row.label}: `, { continued: true }).text(row.value);
      });

      doc.end();
    });
  }
}
