import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/enum/roles.enum';
import { DailySiteReport, DailySiteReportDocument } from 'src/schema/forms/daily-site-report.schema';
import { DailySiteReportDto } from 'src/dto/forms/daily-site-report.dto';

@Injectable()
export class DailySiteReportService {
    private readonly logger = new Logger(DailySiteReportService.name);

    constructor(
        @InjectModel(DailySiteReport.name) private daily_site_model:Model<DailySiteReportDocument>,
    ) {}


    async create_daily_site_report(dto: DailySiteReportDto) {
        try {
            const daily_site_report = new this.daily_site_model({
                ...dto,
                performed_by: new Types.ObjectId(dto.performed_by_user),
            });

            const saved_report = await daily_site_report.save();

            return {
                success: true,
                message: "Daily site report created successfully!",
                data: saved_report
            }
        } catch (error) {
            this.logger.error(`Error creating daily site report: ${error.message}`);
            throw new BadRequestException('Error creating daily site report');
        }
    }


    async update_daily_site_report(dto: DailySiteReportDto, id: string) {
        try {
            const existing_report = await this.daily_site_model.findById(id).exec();

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
            this.logger.error(`Error updating daily site report: ${error.message}`);
            throw new BadRequestException('Error updating daily site report');
        }
    }


    async delete_daily_site_report(id: string) {
        try {
            const delete_report = await this.daily_site_model.findByIdAndDelete(id).exec();

            if (!delete_report) {
                throw new BadRequestException('Report does not exist!');
            }

            return {
                success: true,
                message: 'Report deleted successfully!'
            }
        } catch (error) {
            this.logger.error(`Error deleting daily site report: ${error.message}`);
            throw new BadRequestException('Error deleting daily site report');
        }
    }


    async get_daily_site_report_by_id(id: string) {
        try {
            const report = await this.daily_site_model.findById(id).exec();

            if (!report) {
                throw new BadRequestException('Report does not exist');
            }

            return {
                success: true,
                message: 'Report retrieved successfully!',
                data: report
            }
        } catch (error) {
            this.logger.error(`Error retrieving daily site report: ${error.message}`);
            throw new BadRequestException('Error retrieving daily site report');
        }
    }


    async get_daily_site_report(user: any) {
        try {
            let report: any;
            if (user.role === Role.ADMIN) {
                report = await this.daily_site_model.find().exec();
            } else if (user.role === Role.EMPLOYEE) {
                report = await this.daily_site_model.find({
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
            this.logger.error(`Error retrieving daily site report: ${error.message}`);
            throw new BadRequestException('Error retrieving daily site report');
        }
    }
    
}
