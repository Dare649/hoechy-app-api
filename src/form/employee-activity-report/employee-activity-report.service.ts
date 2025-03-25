import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeActivityReport, EmployeeActivityReportDocument } from 'src/schema/forms/employee-activity-report.schema';
import { EmployeeActivityReportDto } from 'src/dto/forms/employee-activity-report.dto';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class EmployeeActivityReportService {
    private readonly logger = new Logger(EmployeeActivityReportService.name);

    constructor(
        @InjectModel(EmployeeActivityReport.name) private employee_activity_model:Model<EmployeeActivityReportDocument>,
    ) {}

    async create_employee_activity_report(dto: EmployeeActivityReportDto) {
        try {
            const employee_report = new this.employee_activity_model({
                ...dto,
                performed_by: new Types.ObjectId(dto.performed_by_user),
            });

            const saved_report = await employee_report.save();

            return {
                success: true,
                message: "Employee report created successfully!",
                data: saved_report
            }
        } catch (error) {
            this.logger.error(`Error creating employee activity report: ${error.message}`);
            throw new BadRequestException('Error creating employee activity report');
        }
    }


    async update_employee_activity_report(dto: EmployeeActivityReportDto, id: string) {
        try {
            const existing_report = await this.employee_activity_model.findById(id).exec();

            if (!existing_report) {
                throw new BadRequestException('Report does not exist.');
            }

            Object.assign(existing_report, dto);
            await existing_report.save();

            return {
                success: true,
                message: 'Report updated successfully!'
            }
        } catch (error) {
            this.logger.error(`Error updating employee activity report: ${error.message}`);
            throw new BadRequestException('Error updating employee activity report');
        }
    }


    async delete_employee_activity_report(id: string) {
        try {
            const delete_report = await this.employee_activity_model.findByIdAndDelete(id).exec();

            if (!delete_report) {
                throw new BadRequestException('Report does not exist!');
            }

            return {
                success: true,
                message: 'Report deleted successfully!'
            }
        } catch (error) {
            this.logger.error(`Error deleting employee activity report: ${error.message}`);
            throw new BadRequestException('Error deleting employee activity report');
        }
    }


    async get_employee_activity_report_by_id(id: string) {
        try {
            const report = await this.employee_activity_model.findById(id).exec();

            if (!report) {
                throw new BadRequestException('Report does not exist');
            }

            return {
                success: true,
                message: 'Report retrieved successfully!',
                data: report
            }
        } catch (error) {
            this.logger.error(`Error retrieving employee activity report: ${error.message}`);
            throw new BadRequestException('Error retrieving employee activity report');
        }
    }


    async get_employee_activity_report(user: any) {
        try {
            let report: any;
            if (user.role === Role.ADMIN) {
                report = await this.employee_activity_model.find().exec();
            } else if (user.role === Role.EMPLOYEE) {
                report = await this.employee_activity_model.find({
                    performed_by_user: user._id.toString()
                }).exec();
            } else {
                throw new BadRequestException("Unathorized access")
            }

            return {
                success: true,
                message: 'Report retrieved successfully!',
                data: report
            }
        } catch (error) {
            this.logger.error(`Error retrieving employee activity report: ${error.message}`);
            throw new BadRequestException('Error retrieving employee activity report');
        }
    }
}
