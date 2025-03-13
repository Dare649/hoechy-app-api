import { Controller, BadRequestException, Body, Delete, Post, Put, Get, UseGuards, Param } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { VehicleMovementRegisterService } from './vehicle-movement-register.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { VehMovementRegDto } from 'src/dto/forms/vehicle-movement-reg.dto';



@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Vehicle-Movement-Register')
@ApiBearerAuth('access-token')
@Controller('vehicle-movement-register')
export class VehicleMovementRegisterController {
    constructor(
        private readonly veh_move_reg: VehicleMovementRegisterService
    ) {}


    @Post('create_vehicle_movement_register_form')
    @Roles(Role.DRIVER)
    @ApiOperation({
        summary: 'This api creates vehicle movement register form'
    })
    async create_vehicle_maintenance_log(
        @Body() dto: VehMovementRegDto
    ) {
        try {
            return this.veh_move_reg.create_vehicle_movement_register(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating form ${error.message}`);
        }
    }



    @Put('update_vehicle_movement_register_form/:id')
    @Roles(Role.DRIVER)
    @ApiOperation({
        summary: 'This api updates the vehicle movement register form'
    })
    async update_vehicle_maintenance_log(
        @Param('id') id: string,
        @Body() dto: VehMovementRegDto,
    ): Promise<any> {
        try {
            return await this.veh_move_reg.update_vehicle_movement_register(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating form: ${error.message}`);
        }
    }



    @Get('get_vehicle_movement_register_form/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api get the individual vehicle movement register form'
    })
    async get_vehicle_movement_register_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.veh_move_reg.get_vehicle_movement_register_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving form: ${error.message}`);
        }
    }



    @Get('get_all_vehicle_movement_register_form')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api gets a the vehicle movement form'
    })
    async get_vehicle_movement_register() {
        try {
            return this.veh_move_reg.get_vehicle_movement_register();
        } catch (error) {
            throw new BadRequestException(`Error retrieving form: ${error.message}`);
        }
    }



    @Delete('delete_vehicle_movement_register_form/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api allows drivers to delete form.'
    })
    async delete_vehicle_movement_register(@Param('id') id: string): Promise<any> {
        try {
            return this.veh_move_reg.delete_vehicle_movement_register(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting form ${error.message}`);
        }
    }

}
