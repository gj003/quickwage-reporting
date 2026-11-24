import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';

@Injectable()
export class XlsxService {
  async buildReport(rows: Record<string, unknown>[], sheetName = 'Report'): Promise<Buffer> {
    const wb = new Workbook();
    const ws = wb.addWorksheet(sheetName);

    if (rows[0]) {
      ws.columns = Object.keys(rows[0]).map((key) => ({ header: key, key, width: 20 }));
      ws.getRow(1).font = { bold: true };
      ws.addRows(rows);
    }

    return Buffer.from(await wb.xlsx.writeBuffer());
  }
}
