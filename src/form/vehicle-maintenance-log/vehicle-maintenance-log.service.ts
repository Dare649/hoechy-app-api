import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehMainDto } from 'src/dto/forms/vehicle-maintenance-log.dto';
import { VehMain, VehMainDocument } from 'src/schema/forms/vehicle-main-log.schema';

@Injectable()
export class VehicleMaintenanceLogService {
    private readonly logger = new Logger(VehicleMaintenanceLogService.name);

    constructor(
        @InjectModel(VehMain.name) private vehmain_model: Model<VehMainDocument>,
    ) {}



    // creating vehicle maintenance from
    async create_vehicle_maintenance_log(dto: VehMainDto) {
        try {
            const veh_main_log = new this.vehmain_model({
                make: dto.make,
                model: dto.model,
                year: dto.year,
                veh_id_number: dto.veh_id_number,
                engine: dto.engine,
                date_of_service: dto.date_of_service,
                milage_of_service: dto.milage_of_service,
                work_performed_by_service_schedule: dto.work_performed_by_service_schedule,
                performed_by: dto.performed_by,
                cost: dto.cost,
                invoice: dto.invoice,
                notes: dto.notes
            });

            const saved_veh_main_log = await veh_main_log.save();

            return {
                success: true,
                message: 'Vehicle maintenance log form created successfully!',
                data: saved_veh_main_log
            }
        } catch (error) {
            this.logger.error('Error creating vehicle maintenance log form')
        }
    }




    // updating vehicle maintenance form
    async update_vehicle_maintenance_log(dto: VehMainDto, id: string): Promise<any> {
        try {
            const exisiting_veh_main_log = await this.vehmain_model.findById(id).exec();

            if (!exisiting_veh_main_log) {
                throw new BadRequestException('form does not exist');
            }

            exisiting_veh_main_log.make = dto.make || exisiting_veh_main_log.make;
            exisiting_veh_main_log.model = exisiting_veh_main_log.model;
            exisiting_veh_main_log.year = dto.year || exisiting_veh_main_log.year;
            exisiting_veh_main_log.veh_id_number = dto.veh_id_number || exisiting_veh_main_log.veh_id_number;
            exisiting_veh_main_log.engine = dto.engine || exisiting_veh_main_log.engine;
            exisiting_veh_main_log.date_of_service = exisiting_veh_main_log.date_of_service;
            exisiting_veh_main_log.milage_of_service = dto.milage_of_service || exisiting_veh_main_log.milage_of_service;
            exisiting_veh_main_log.work_performed_by_service_schedule = dto.work_performed_by_service_schedule || exisiting_veh_main_log.work_performed_by_service_schedule;
            exisiting_veh_main_log.performed_by = dto.performed_by || exisiting_veh_main_log.performed_by;
            exisiting_veh_main_log.cost = dto.cost || exisiting_veh_main_log.cost;
            exisiting_veh_main_log.invoice = dto.invoice || exisiting_veh_main_log.invoice;
            exisiting_veh_main_log.notes = dto.notes || exisiting_veh_main_log.notes;

            await exisiting_veh_main_log.save();

            return {
                success: true,
                message: 'Form updated successfully!',
            }
        } catch (error) {
            this.logger.error(`Error updating form: ${error.message}`);
            throw new BadRequestException('An error occured while updating form');
        }
    }



    // delete vehicle maintenance log form
    async delete_vehicle_maintenance_log(id: string): Promise<any> {
        try {
            const delete_veh_main_log = await this.vehmain_model.findByIdAndDelete(id).exec();

            if (!delete_veh_main_log) {
                throw new BadRequestException('Form does not exist');
            }

            return {
                success: true,
                message: 'Form deleted successfully!'
            }
        } catch (error) {
            this.logger.error(`Error deleting form: ${error.message}`);
            throw new BadRequestException('An error occured while deleting form');
        }
    }



    // get vehicle maintenance log by ID
    async get_vehicle_maintenance_log_by_id(id: string): Promise<any> {
        try {
            const veh_main_log = await this.vehmain_model.findById(id).exec();

            if (!veh_main_log) {
                throw new BadRequestException('Form does not exist');
            }

            return {
                success: true,
                message: 'Form retrieved successfully!',
                data: veh_main_log
            }
        } catch (error) {
            this.logger.error(`Error retrieving form: ${error.message}`);
            throw new BadRequestException('An error occured while retrieving form');
        }
    }



    // get all vehicle maintenance form
    async get_vehicle_maintenance_log() {
        try {
            const veh_main_log = await this.vehmain_model.find().exec();

            return {
                success: true,
                message: 'Form retrieved successfully!',
                data: veh_main_log
            }
        } catch (error) {
            this.logger.error(`Error retrieving form: ${error.messgae}`);
            throw new BadRequestException('An error occured while retrieving form');
        }
    }
}
