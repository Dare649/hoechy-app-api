import { BadRequestException, Body, Req, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { DailyInspectionService } from './daily-inspection.service';
import { DailyInspectionDto } from 'src/dto/forms/daily-inspection.dto';


@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Daily-Inspection-Report')
@ApiBearerAuth('access-token') 
@Controller('daily-inspection')
export class DailyInspectionController {
    constructor(
        private readonly daily_inspection: DailyInspectionService
    ) {}

    @Post('create_daily_inspection')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api creates daily inspection'
    })
    async create_daily_inspection(
        @Body() dto: DailyInspectionDto
    ) {
        try {
            return this.daily_inspection.create_daily_inspection(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating daily inspection ${error.message}`);
        }
    }


    @Put('update_daily_inspection/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api updates the daily inspection'
    })
    async update_daily_inspection(
        @Param('id') id: string,
        @Body() dto: DailyInspectionDto,
    ): Promise<any> {
        try {
            return await this.daily_inspection.update_daily_inspection(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating daily inspection: ${error.message}`);
        }
    }


    @Get('get_daily_inspection/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api get the daily inspection'
    })
    async get_daily_inspection_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.daily_inspection.get_daily_inspection_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving daily inspection: ${error.message}`);
        }
    }


    @Get("get_daily_inspection")
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: "Retrieve daily inspection based on user roles",
    })
    async get_daily_inspection(@Req() req: any) {
        try {
            return await this.daily_inspection.get_daily_inspection(req.user);
        } catch (error) {
            throw new BadRequestException(`Error retrieving daily inspection: ${error.message}`);
        }
    }


    @Delete('delete_daily_inspection/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api allows drivers to delete daily inspection.'
    })
    async delete_daily_inspection(@Param('id') id: string): Promise<any> {
        try {
            return this.daily_inspection.delete_daily_inspection(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting daily inspection ${error.message}`);
        }
    }
}
