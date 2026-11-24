import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller.js';
import { XlsxService } from './xlsx.service.js';
import { PdfService } from './pdf.service.js';

@Module({
  controllers: [ReportsController],
  providers: [XlsxService, PdfService],
  exports: [XlsxService, PdfService],
})
export class ReportsModule {}
