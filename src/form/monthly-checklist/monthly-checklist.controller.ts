import { BadRequestException, Body, Req, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { MonthlyChecklistService } from './monthly-checklist.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { MonthlyChecklistDto } from 'src/dto/forms/monthly-checklist.dto';


@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Monthly-Vehicle-Maintenance-Checklist')
@ApiBearerAuth('access-token') 
@Controller('monthly-checklist')
export class MonthlyChecklistController {
    constructor(
        private readonly monthly_checklist: MonthlyChecklistService
    ) {}


    @Post('create_monthly_checklist')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api creates monthly checklist'
    })
    async create_monthly_checklist(
        @Body() dto: MonthlyChecklistDto
    ) {
        try {
            return this.monthly_checklist.create_monthly_checklist(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating checklist ${error.message}`);
        }
    }


    @Put('update_monthly_checklist/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api updates the checklist'
    })
    async update_monthly_checklist(
        @Param('id') id: string,
        @Body() dto: MonthlyChecklistDto,
    ): Promise<any> {
        try {
            return await this.monthly_checklist.update_monthly_checklist(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating checklist: ${error.message}`);
        }
    }


    @Get('get_monthly_checklist/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api get the individual checklist'
    })
    async get_monthly_checklist_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.monthly_checklist.get_monthly_checklist_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving checklist: ${error.message}`);
        }
    }


    @Get("get_monthly_checklist")
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: "Retrieve checklist based on user roles",
    })
    async get_monthly_checklist(@Req() req: any) {
        try {
            return await this.monthly_checklist.get_monthly_checklist(req.user);
        } catch (error) {
            throw new BadRequestException(`Error retrieving checklist: ${error.message}`);
        }
    }


    @Delete('delete_monthly_checklist/:id')
    @Roles(Role.ADMIN, Role.DRIVER)
    @ApiOperation({
        summary: 'This api allows drivers to delete checklist.'
    })
    async delete_monthly_checklist(@Param('id') id: string): Promise<any> {
        try {
            return this.monthly_checklist.delete_monthly_checklist(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting checklist ${error.message}`);
        }
    }
}
