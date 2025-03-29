import { BadRequestException, Body, Req, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { DailySiteReportService } from './daily-site-report.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { DailySiteReportDto } from 'src/dto/forms/daily-site-report.dto';


@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Daily-Site-Report')
@ApiBearerAuth('access-token') 
@Controller('daily-site-report')
export class DailySiteReportController {
    constructor(
        private readonly daily_site_report: DailySiteReportService
    ) {}


    @Post('create_daily_site_report')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api creates a daily site report'
    })
    async create_daily_site_report(
        @Body() dto: DailySiteReportDto
    ) {
        try {
            return this.daily_site_report.create_daily_site_report(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating report ${error.message}`);
        }
    }


    @Put('update_daily_site_report/:id')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api updates the report'
    })
    async update_daily_site_report(
        @Param('id') id: string,
        @Body() dto: DailySiteReportDto,
    ): Promise<any> {
        try {
            return await this.daily_site_report.update_daily_site_report(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating report: ${error.message}`);
        }
    }


    @Get('get_daily_site_report/:id')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api get the individual report'
    })
    async get_daily_site_report_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.daily_site_report.get_daily_site_report_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving report: ${error.message}`);
        }
    }


    @Get("get_daily_site_report")
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: "Retrieve report based on user roles",
    })
    async get_daily_site_report(@Req() req: any) {
        try {
            return await this.daily_site_report.get_daily_site_report(req.user);
        } catch (error) {
            throw new BadRequestException(`Error retrieving report: ${error.message}`);
        }
    }


    @Delete('delete_daily_site_report/:id')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api allows employees to delete report.'
    })
    async delete_daily_site_report(@Param('id') id: string): Promise<any> {
        try {
            return this.daily_site_report.delete_daily_site_report(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting report ${error.message}`);
        }
    }
}
