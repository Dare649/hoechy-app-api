import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MonthlyChecklistDto } from 'src/dto/forms/monthly-checklist.dto';
import { MonthlyChecklist, MonthlyChecklistDocument } from 'src/schema/forms/monthly-checklist.schema';
import { Role } from 'src/enum/roles.enum';


@Injectable()
export class MonthlyChecklistService {
    private readonly logger = new Logger(MonthlyChecklistService.name);

    constructor(
        @InjectModel(MonthlyChecklist.name) private check_list_model:Model<MonthlyChecklistDocument>,
    ) {}


    async create_monthly_checklist(dto: MonthlyChecklistDto) {
        try {
            const monthly_checklist = new this.check_list_model({
                ...dto,
                performed_by: new Types.ObjectId(dto.performed_by_user),
            });

            const saved_monthly_checklst = await monthly_checklist.save();

            return {
                success: true,
                message: "Monthly checklist created successfully!",
                data: saved_monthly_checklst,
            }
        } catch (error) {
            this.logger.error(`Error creating monthly checklist: ${error.message}`);
            throw new BadRequestException('Error creating monthly checklist');
        }
    }


    async update_monthly_checklist(dto: MonthlyChecklistDto, id: string) {
        try {
            const existing_check = await this.check_list_model.findById(id).exec();

            if (!existing_check) {
                throw new BadRequestException('Monthly checklist does not exist');
            }

            Object.assign(existing_check, dto);
            await existing_check.save();

            return {
                success: true,
                message: "Monthly checklist updated successfully!"
            }
        } catch (error) {
            this.logger.error(`Error updating checklist: ${error.message}`);
            throw new BadRequestException('An error occurred while updating checklist');
        }
    }


    async delete_monthly_checklist(id: string) {
        try {
            const delete_checklist = await this.check_list_model.findByIdAndDelete(id).exec();

            if (!delete_checklist) {
                throw new BadRequestException('Monthly checklist not found');
            }

            return {
                success: true,
                message: "Monthly checklist deleted successfully!"
            }
        } catch (error) {
            this.logger.error(`Error deleting checklist: ${error.message}`);
            throw new BadRequestException('An error occurred while deleting checklist');
        }
    }


    async get_monthly_checklist_by_id(id: string) {
        try {
            const monthly_checklist = await this.check_list_model.findById(id).exec();

            if (!monthly_checklist) {
                throw new BadRequestException('Checlist does not exist')
            }

            return {
                success: true,
                message: "Checklist retieved successfully!",
                data: monthly_checklist
            }
        } catch (error) {
            this.logger.error(`Error retrieving checklist: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving checklist');
        }
    }


    async get_monthly_checklist(user: any) {
        try {
            let checklist: any;
            if (user.role === Role.ADMIN) {
                checklist = await this.check_list_model.find().exec();
            } else if (user.role === Role.DRIVER) {
                checklist = await this.check_list_model.find({
                    performed_by_user: user._id.toString()
                }).exec();
            } else {
                throw new BadRequestException('Unauthorized access');
            }

            return {
                success: true,
                message: "Checklist retrieved successfully!",
                data: checklist
            }
        } catch (error) {
            console.error(`Error retrieving checklist: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving checklist');
        }
    }
}
