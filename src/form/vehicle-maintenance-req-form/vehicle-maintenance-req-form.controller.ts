import { Controller, Post, Req, UseGuards, Body, BadRequestException, Put, Get, Param, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { VehicleMaintenanceReqFormService } from './vehicle-maintenance-req-form.service';
import { VehMainReqDto } from 'src/dto/forms/vehicle-main-req.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@UseGuards(AuthGuard, RoleGuard)
@ApiTags('vehicle-maintenance-request-form')
@ApiBearerAuth('access-token')
@Controller('vehicle-maintenance-req-form')
export class VehicleMaintenanceReqFormController {
    constructor(
        private readonly veh_main_req: VehicleMaintenanceReqFormService
    ) {}

    @Post('create_vehicle_maintenance_req_form')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api create vehicle maintenance request form'
    })
    async create_vehicle_maintenance_req(
        @Body() dto: VehMainReqDto
    ) {
        try {
            return this.veh_main_req.create_vehicle_maintenance_request_form(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating form ${error.message}`);
        }
    }


    @Put('update_vehicle_maintenance_req_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api updates the vehicle maintenance log form'
    })
    async update_vehicle_maintenance_req(
        @Param('id') id: string,
        @Body() dto: VehMainReqDto,
    ): Promise<any> {
        try {
            return await this.veh_main_req.update_vehicle_maintenance_request_form(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating form: ${error.message}`);
        }
    }


    @Get('get_vehicle_maintenance_req_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api get the individual vehicle maintenace req form'
    })
    async get_vehicle_maintenance_req_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.veh_main_req.get_vehicle_maintenance_request_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving form: ${error.message}`);
        }
    }


   @Get('get_all_vehicle_maintenance_req_form')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This API retrieves vehicle maintenance log forms based on user roles'
    })
    async get_vehicle_maintenance_log(@Req() req: any) {
        try {
            return this.veh_main_req.get_vehicle_maintenance_request(req.user);
        } catch (error) {
            throw new BadRequestException(`Error retrieving forms: ${error.message}`);
        }
    }


    @Delete('delete_vehicle_maintenance_req_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api allows drivers to delete form.'
    })
    async delete_vehicle_maintenance_req(@Param('id') id: string): Promise<any> {
        try {
            return this.veh_main_req.delete_vehicle_maintenance_request_form(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting form ${error.message}`);
        }
    }


}
