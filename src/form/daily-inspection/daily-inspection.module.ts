import { Module } from '@nestjs/common';
import { DailyInspectionService } from './daily-inspection.service';
import { DailyInspectionController } from './daily-inspection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyInspection, DailyInspectionSchema } from 'src/schema/forms/daily-inspection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: DailyInspection.name,
      schema: DailyInspectionSchema
    }])
  ],
  providers: [DailyInspectionService],
  controllers: [DailyInspectionController],
  exports: [
    MongooseModule.forFeature([{
      name: DailyInspection.name,
      schema: DailyInspectionSchema
    }])
  ],
})
export class DailyInspectionModule {}
