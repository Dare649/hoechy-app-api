import { Module } from '@nestjs/common';
import { VehicleMovementRegisterService } from './vehicle-movement-register.service';
import { VehicleMovementRegisterController } from './vehicle-movement-register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehMoveReg, VehMoveRegSchema } from 'src/schema/forms/vehicle-movement-register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: VehMoveReg.name,
      schema: VehMoveRegSchema
    }])
  ],
  providers: [
    VehicleMovementRegisterService
  ],
  controllers: [
    VehicleMovementRegisterController
  ],
  exports: [
    MongooseModule.forFeature([{
      name: VehMoveReg.name,
      schema: VehMoveRegSchema
    }])
  ]
})
export class VehicleMovementRegisterModule {}
