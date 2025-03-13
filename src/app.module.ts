import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehicleMaintenanceLogModule } from './form/vehicle-maintenance-log/vehicle-maintenance-log.module';
import { VehicleMaintenanceReqFormModule } from './form/vehicle-maintenance-req-form/vehicle-maintenance-req-form.module';
import { VehicleMovementRegisterModule } from './form/vehicle-movement-register/vehicle-movement-register.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI')
      })
    }),
    CloudinaryModule,
    AuthModule,
    UsersModule,
    VehicleMaintenanceLogModule,
    VehicleMaintenanceReqFormModule,
    VehicleMovementRegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
