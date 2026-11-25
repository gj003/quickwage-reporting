import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

const { Workbook, stream } = ExcelJS;
import type { Writable } from 'node:stream';

type Row = Record<string, unknown>;

// Excel per-sheet row cap. Reserve one for header.
const EXCEL_MAX_ROWS_PER_SHEET = 1_048_575;

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
   * Streams rows to `out` using exceljs's WorkbookWriter (constant memory).
   * - Splits across sheets automatically when exceeding Excel's row cap.
   * - Honors backpressure via the underlying write stream.
   * - Aborts cleanly if `out` is closed by the client.
   */
  async streamReport(
    rows: AsyncIterable<Row> | Iterable<Row>,
    out: Writable,
    sheetName = 'Report',
  ): Promise<void> {
    const wb = new stream.xlsx.WorkbookWriter({
      stream: out,
      useStyles: true,
      useSharedStrings: false, // lower memory for unique-heavy data
    });

    type Sheet = ReturnType<typeof wb.addWorksheet>;
    let columns: string[] | null = null;
    let ws: Sheet | null = null;
    let sheetIndex = 0;
    let rowsInSheet = 0;
    let aborted = false;

    const onClose = () => {
      aborted = true;
    };
    out.on('close', onClose);

    const openSheet = () => {
      sheetIndex += 1;
      ws = wb.addWorksheet(sheetIndex === 1 ? sheetName : `${sheetName} (${sheetIndex})`);
      if (columns) {
        ws.columns = columns.map((key) => ({ header: key, key, width: 20 }));
        ws.getRow(1).font = { bold: true };
        ws.getRow(1).commit();
      }
      rowsInSheet = 0;
    };

    try {
      for await (const row of rows) {
        if (aborted) return;

        if (!columns) {
          columns = Object.keys(row);
          openSheet();
        }
        if (rowsInSheet >= EXCEL_MAX_ROWS_PER_SHEET) {
          ws!.commit();
          openSheet();
        }

        ws!.addRow(row).commit();
        rowsInSheet += 1;
      }

      if (ws) (ws as Sheet).commit();
      await wb.commit();
    } finally {
      out.off('close', onClose);
    }
  }
}
