import { Module } from '@nestjs/common';
import { MonthlyChecklistService } from './monthly-checklist.service';
import { MonthlyChecklistController } from './monthly-checklist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthlyChecklist, MonthlyChecklistSchema } from 'src/schema/forms/monthly-checklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: MonthlyChecklist.name,
      schema: MonthlyChecklistSchema
    }])
  ],
  providers: [MonthlyChecklistService],
  controllers: [MonthlyChecklistController],
  exports: [
    MongooseModule.forFeature([{
      name: MonthlyChecklist.name,
      schema: MonthlyChecklistSchema
    }])
  ],
})
export class MonthlyChecklistModule {}
