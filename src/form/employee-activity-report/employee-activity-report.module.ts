import { Module } from '@nestjs/common';
import { EmployeeActivityReportService } from './employee-activity-report.service';
import { EmployeeActivityReportController } from './employee-activity-report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeActivityReport, EmployeeActivityReportSchema } from 'src/schema/forms/employee-activity-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EmployeeActivityReport.name,
      schema: EmployeeActivityReportSchema
    }])
  ],
  providers: [EmployeeActivityReportService],
  controllers: [EmployeeActivityReportController],
  exports: [
    MongooseModule.forFeature([{
      name: EmployeeActivityReport.name,
      schema: EmployeeActivityReportSchema
    }])
  ],
})
export class EmployeeActivityReportModule {}
