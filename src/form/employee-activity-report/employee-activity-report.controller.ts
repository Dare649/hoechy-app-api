import { BadRequestException, Body, Req, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { EmployeeActivityReportService } from './employee-activity-report.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { EmployeeActivityReportDto } from 'src/dto/forms/employee-activity-report.dto';


@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Employee-Weekly-Activity-Report')
@ApiBearerAuth('access-token') 
@Controller('employee-activity-report')
export class EmployeeActivityReportController {
    constructor(
        private readonly employee_activity_report: EmployeeActivityReportService
    ) {}


    @Post('create_employee_activity_report')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api creates a weekly activity report'
    })
    async create_employee_activity_report(
        @Body() dto: EmployeeActivityReportDto
    ) {
        try {
            return this.employee_activity_report.create_employee_activity_report(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating report ${error.message}`);
        }
    }


    @Put('update_employee_activity_report/:id')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api updates the report'
    })
    async update_employee_activity_report(
        @Param('id') id: string,
        @Body() dto: EmployeeActivityReportDto,
    ): Promise<any> {
        try {
            return await this.employee_activity_report.update_employee_activity_report(dto, id)
        } catch (error) {
            throw new BadRequestException(`Error updating report: ${error.message}`);
        }
    }


    @Get('get_employee_activity_report/:id')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api get the individual report'
    })
    async get_employee_activity_report_by_id(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.employee_activity_report.get_employee_activity_report_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving report: ${error.message}`);
        }
    }


    @Get("get_employee_activity_report")
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: "Retrieve report based on user roles",
    })
    async get_employee_activity_report(@Req() req: any) {
        try {
            return await this.employee_activity_report.get_employee_activity_report(req.user);
        } catch (error) {
            throw new BadRequestException(`Error retrieving report: ${error.message}`);
        }
    }


    @Delete('delete_employee_activity_report/:id')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @ApiOperation({
        summary: 'This api allows employees to delete report.'
    })
    async delete_employee_activity_report(@Param('id') id: string): Promise<any> {
        try {
            return this.employee_activity_report.delete_employee_activity_report(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting report ${error.message}`);
        }
    }
}
