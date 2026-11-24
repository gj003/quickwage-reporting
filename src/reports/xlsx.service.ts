import { Injectable } from '@nestjs/common';
import { Workbook, stream } from 'exceljs';
import type { Writable } from 'node:stream';

type Row = Record<string, unknown>;

@Injectable()
export class XlsxService {
  async buildReport(rows: Row[], sheetName = 'Report'): Promise<Buffer> {
    const wb = new Workbook();
    const ws = wb.addWorksheet(sheetName);

    if (rows[0]) {
      ws.columns = Object.keys(rows[0]).map((key) => ({ header: key, key, width: 20 }));
      ws.getRow(1).font = { bold: true };
      ws.addRows(rows);
    }

    return Buffer.from(await wb.xlsx.writeBuffer());
  }

  /**
   * Streams rows directly to a Writable (e.g. HTTP response). Memory stays flat
   * regardless of row count — use for datasets over a few thousand rows, or
   * when rows come from a DB cursor / async iterable.
   */
  async streamReport(
    rows: AsyncIterable<Row> | Iterable<Row>,
    out: Writable,
    sheetName = 'Report',
  ): Promise<void> {
    const wb = new stream.xlsx.WorkbookWriter({ stream: out, useStyles: true });
    const ws = wb.addWorksheet(sheetName);

    let headerWritten = false;
    for await (const row of rows) {
      if (!headerWritten) {
        ws.columns = Object.keys(row).map((key) => ({ header: key, key, width: 20 }));
        ws.getRow(1).font = { bold: true };
        ws.getRow(1).commit();
        headerWritten = true;
      }
      ws.addRow(row).commit();
    }
    ws.commit();
    await wb.commit();
  }
}
