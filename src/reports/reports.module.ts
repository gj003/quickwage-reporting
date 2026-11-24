import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller.js';
import { ReportService } from './report.service.js';
import { XlsxService } from './xlsx.service.js';
import { PdfService } from './pdf.service.js';

@Module({
  controllers: [ReportsController],
  providers: [ReportService, XlsxService, PdfService],
  exports: [ReportService],
})
export class ReportsModule {}
