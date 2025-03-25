import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VehMainDto } from 'src/dto/forms/vehicle-maintenance-log.dto';
import { VehMain, VehMainDocument } from 'src/schema/forms/vehicle-main-log.schema';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class VehicleMaintenanceLogService {
    private readonly logger = new Logger(VehicleMaintenanceLogService.name);

    constructor(
        @InjectModel(VehMain.name) private vehmain_model: Model<VehMainDocument>,
    ) {}

    async create_vehicle_maintenance_log(dto: VehMainDto) {
        try {
            const veh_main_log = new this.vehmain_model({
                ...dto,
                performed_by: new Types.ObjectId(dto.performed_by_user),
            });

            const saved_veh_main_log = await veh_main_log.save();
            return { success: true, message: 'Vehicle maintenance log created successfully!', data: saved_veh_main_log };
        } catch (error) {
            this.logger.error(`Error creating vehicle maintenance log: ${error.message}`);
            throw new BadRequestException('Error creating vehicle maintenance log');
        }
    }

    async update_vehicle_maintenance_log(dto: VehMainDto, id: string) {
        try {
            const existing_log = await this.vehmain_model.findById(id).exec();
            if (!existing_log) throw new BadRequestException('Form does not exist');
            
            Object.assign(existing_log, dto);
            await existing_log.save();

            return { success: true, message: 'Form updated successfully!' };
        } catch (error) {
            this.logger.error(`Error updating form: ${error.message}`);
            throw new BadRequestException('An error occurred while updating form');
        }
    }

    async delete_vehicle_maintenance_log(id: string) {
        try {
            const deleted_log = await this.vehmain_model.findByIdAndDelete(id).exec();
            if (!deleted_log) throw new BadRequestException('Form does not exist');

            return { success: true, message: 'Form deleted successfully!' };
        } catch (error) {
            this.logger.error(`Error deleting form: ${error.message}`);
            throw new BadRequestException('An error occurred while deleting form');
        }
    }

    async get_vehicle_maintenance_log_by_id(id: string) {
        try {
            const veh_main_log = await this.vehmain_model.findById(id).exec();
            if (!veh_main_log) throw new BadRequestException('Form does not exist');

            return { success: true, message: 'Form retrieved successfully!', data: veh_main_log };
        } catch (error) {
            this.logger.error(`Error retrieving form: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving form');
        }
    }

    async get_vehicle_maintenance_log(user: any) {
        try {
           
            let logs: any;
            if (user.role === Role.ADMIN) {
                logs = await this.vehmain_model.find().exec();
            } else if (user.role === Role.DRIVER) {
                logs = await this.vehmain_model.find({
                    performed_by_user: user._id.toString() 
                }).exec();
    
            } else {
                throw new BadRequestException('Unauthorized access');
            }
    
            return { success: true, message: 'Forms retrieved successfully!', data: logs };
        } catch (error) {
            console.error(`Error retrieving forms: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving forms');
        }
    }
    
    
}
