export type ReportFormat = 'pdf' | 'xlsx';

export interface ReportOptions {
  format: ReportFormat;
  title?: string;
  filename?: string;
  sheetName?: string;
}

export interface ReportResult {
  buffer: Buffer;
  mimeType: string;
  filename: string;
}

export const REPORT_MIME: Record<ReportFormat, string> = {
  pdf: 'application/pdf',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
