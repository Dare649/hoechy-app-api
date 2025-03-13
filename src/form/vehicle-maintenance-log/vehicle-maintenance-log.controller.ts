import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { VehicleMaintenanceLogService } from './vehicle-maintenance-log.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { VehMainDto } from 'src/dto/forms/vehicle-maintenance-log.dto';



@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Vehicle-Maintence-Log')
@ApiBearerAuth('access-token') 
@Controller('vehicle-maintenance-log')
export class VehicleMaintenanceLogController {
    constructor(
        private readonly veh_main_log: VehicleMaintenanceLogService
    ) {}


    @Post('create_vehicle_maintenance_log_form')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api creates vehicle maintenance log form'
    })
    async create_vehicle_maintenance_log(
        @Body() dto: VehMainDto
    ) {
        try {
            return this.veh_main_log.create_vehicle_maintenance_log(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating form ${error.message}`);
        }
    }


    @Put('update_vehicle_maintenance_log_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api updates the vehicle maintenance log form'
    })
    async update_vehicle_maintenance_log(
        @Param('id') id: string,
        @Body() dto: VehMainDto,
    ): Promise<any> {
        try {
            return await this.veh_main_log.update_vehicle_maintenance_log(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating form: ${error.message}`);
        }
    }



    @Get('get_vehicle_maintenance_log_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api get the individual vehicle maintenace log form'
    })
    async get_vehicle_maintenance_log_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.veh_main_log.get_vehicle_maintenance_log_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving form: ${error.message}`);
        }
    }



    @Get('get_all_vehicle_maintenance_log_form')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api gets a the vehicle maintenace log form'
    })
    async get_vehicle_maintenance_log() {
        try {
            return this.veh_main_log.get_vehicle_maintenance_log();
        } catch (error) {
            throw new BadRequestException(`Error retrieving form: ${error.message}`);
        }
    }


    @Delete('delete_vehicle_maintenance_log_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api allows drivers to delete form.'
    })
    async delete_vehicle_maintenance_log(@Param('id') id: string): Promise<any> {
        try {
            return this.veh_main_log.delete_vehicle_maintenance_log(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting form ${error.message}`);
        }
    }

}
