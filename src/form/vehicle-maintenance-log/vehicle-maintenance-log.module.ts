import { Module } from '@nestjs/common';
import { VehicleMaintenanceLogService } from './vehicle-maintenance-log.service';
import { VehicleMaintenanceLogController } from './vehicle-maintenance-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehMain, VehMainSchema } from 'src/schema/forms/vehicle-main-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: VehMain.name,
      schema: VehMainSchema
    }])
  ],
  providers: [
    VehicleMaintenanceLogService
  ],
  controllers: [
    VehicleMaintenanceLogController
  ],
  exports: [MongooseModule.forFeature([{
    name: VehMain.name,
    schema: VehMainSchema
  }])]
})
export class VehicleMaintenanceLogModule {}
