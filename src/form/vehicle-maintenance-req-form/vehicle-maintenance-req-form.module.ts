import { Module } from '@nestjs/common';
import { VehicleMaintenanceReqFormService } from './vehicle-maintenance-req-form.service';
import { VehicleMaintenanceReqFormController } from './vehicle-maintenance-req-form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehMainReq, VehMainReqSchema } from 'src/schema/forms/vehicle-main-req-form.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: VehMainReq.name,
      schema: VehMainReqSchema
    }])
  ], 
  providers: [VehicleMaintenanceReqFormService],
  controllers: [VehicleMaintenanceReqFormController],
  exports: [
    MongooseModule.forFeature([{
      name: VehMainReq.name,
      schema: VehMainReqSchema
    }])
  ]
})
export class VehicleMaintenanceReqFormModule {}
