import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DailyInspection, DailyInspectionDocument } from 'src/schema/forms/daily-inspection.schema';
import { DailyInspectionDto } from 'src/dto/forms/daily-inspection.dto';
import { Role } from 'src/enum/roles.enum';


@Injectable()
export class DailyInspectionService {
    private readonly logger = new Logger(DailyInspectionService.name);


    constructor(
        @InjectModel(DailyInspection.name) private daily_inspection_model: Model<DailyInspectionDocument>,
    ) {}


    async create_daily_inspection(dto: DailyInspectionDto) {
        try {
            const daily_inspection = new this.daily_inspection_model({
                ...dto,
                performed_by: new Types.ObjectId(dto.performed_by_user),
            });

            const saved_daily_inspection = await daily_inspection.save();

            return {
                success: true,
                message: "Daily inspection created successfully!",
                data: saved_daily_inspection,
            }
        } catch (error) {
            this.logger.error(`Error creating daily inspection checklist: ${error.message}`);
            throw new BadRequestException('Error creating dailly inspection checklist');
        }
    }


    async update_daily_inspection(dto: DailyInspectionDto, id: string) {
        try {
            const existing_inspection = await this.daily_inspection_model.findById(id).exec();

            if (!existing_inspection) {
                throw new BadRequestException('Daily inspection does not exist.');
            }

            Object.assign(existing_inspection, dto);
            await existing_inspection.save();

            return {
                success: true,
                message: "Daily inspection updated successfully!"
            }
        } catch (error) {
            this.logger.error(`Error updating daily inspection: ${error.message}`);
            throw new BadRequestException('An error occurred while updating daily inspection');
        }
    }


    async delete_daily_inspection(id: string) {
        try {
            const delete_daily_inspection = await this.daily_inspection_model.findByIdAndDelete(id).exec();

            if (!delete_daily_inspection) {
                throw new BadRequestException('Daily inspection not found');
            }

            return {
                success: true,
                message: 'Daily inspection deleted successfully!'
            }
        } catch (error) {
            this.logger.error(`Error deleting daily inspection: ${error.message}`);
            throw new BadRequestException('An error occurred while deleting daily inspection');   
        }
    }


    async get_daily_inspection_by_id(id: string) {
        try {
            const daily_inspection = await this.daily_inspection_model.findById(id).exec();

            if (!daily_inspection) {
                throw new BadRequestException('Daily inspection does not exist')
            }

            return {
                success: true,
                message: 'Daily inspection retrieved successfully!',
                data: daily_inspection
            }
        } catch (error) {
            this.logger.error(`Error retrieving daily inspection: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving daily inspection');
        }
    }


    async get_daily_inspection(user: any) {
        try {
            let inspection: any;
            if (user.role === Role.ADMIN) {
                inspection = await this.daily_inspection_model.find().exec();
            } else if (user.role === Role.DRIVER) {
                inspection = await this.daily_inspection_model.find({
                    performed_by_user: user._id.toString()
                }).exec();
            } else {
                throw new BadRequestException('Unauthorized access');
            }

            return {
                success: true,
                message: "Daily inspection retrieved successfully!",
                data: inspection
            }
        } catch (error) {
            console.error(`Error retrieving daily inspection: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving daily inspection');
        }
    }
}
