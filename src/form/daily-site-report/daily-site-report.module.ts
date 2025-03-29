import { Module } from '@nestjs/common';
import { DailySiteReportService } from './daily-site-report.service';
import { DailySiteReportController } from './daily-site-report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailySiteReport, DailySiteReportSchema } from 'src/schema/forms/daily-site-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: DailySiteReport.name,
      schema: DailySiteReportSchema
    }])
  ],
  providers: [DailySiteReportService],
  controllers: [DailySiteReportController],
  exports: [
    MongooseModule.forFeature([{
      name: DailySiteReport.name,
      schema: DailySiteReportSchema
    }])
  ],
})
export class DailySiteReportModule {}
