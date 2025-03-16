import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehMainReqDto } from 'src/dto/forms/vehicle-main-req.dto';
import { VehMainReq, VehMainReqDocument } from 'src/schema/forms/vehicle-main-req-form.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';


@Injectable()
export class VehicleMaintenanceReqFormService {
    private readonly logger = new Logger(VehicleMaintenanceReqFormService.name);

    constructor(
        @InjectModel(VehMainReq.name) private vehmain_req_model: Model<VehMainReqDocument>,
    ) {}


    // create form
    async create_vehicle_maintenance_request_form(dto: VehMainReqDto) {
        try {
            const veh_main_req = new this.vehmain_req_model({
                veh_number: dto.veh_number,
                filled_by: dto.filled_by,
                report_date: dto.report_date,
                mechanic_name: dto.mechanic_name,
                mechanic_notes: dto.mechanic_notes,
                description_of_problem: dto.description_of_problem,
                completed_date: dto.completed_date
            });

            const saved_veh_main_req = await veh_main_req.save();

            return {
                success: true,
                message: 'Form created successfully!',
                data: saved_veh_main_req
            }
        } catch (error) {
            this.logger.error('Error creating form')
        }
    }


    // update form
    async update_vehicle_maintenance_request_form(dto: VehMainReqDto, id: string): Promise<any> {
        try {
            const existing_veh_main_req = await this.vehmain_req_model.findById(id).exec();

            if (!existing_veh_main_req) {
                throw new BadRequestException('form does not exist.');
            }

            existing_veh_main_req.veh_number = dto.veh_number || existing_veh_main_req.veh_number;
            existing_veh_main_req.filled_by = dto.filled_by || existing_veh_main_req.filled_by;
            existing_veh_main_req.report_date = dto.report_date || existing_veh_main_req.report_date;
            existing_veh_main_req.mechanic_notes = dto.mechanic_notes || existing_veh_main_req.mechanic_notes;
            existing_veh_main_req.description_of_problem = dto.description_of_problem || existing_veh_main_req.description_of_problem;
            existing_veh_main_req.completed_date = dto.completed_date || existing_veh_main_req.completed_date;
            existing_veh_main_req.mechanic_name = dto.mechanic_name || existing_veh_main_req.mechanic_name;

            await existing_veh_main_req.save();

            return {
                success: true,
                message: 'Form updated successfully!'
            }

        } catch (error) {
            this.logger.error(`Error updating form: ${error.message}`);
            throw new BadRequestException('An error occured while updating form');
        }
    }


    // delete form
    async delete_vehicle_maintenance_request_form(id: string): Promise<any> {
        try {
            const delete_veh_main_req = await this.vehmain_req_model.findByIdAndDelete(id).exec();

            if (!delete_veh_main_req) {
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


    // get form by id
    async get_vehicle_maintenance_request_by_id(id: string): Promise<any> {
        try {
            const veh_main_req = await this.vehmain_req_model.findById(id).exec();

            if (!veh_main_req) {
                throw new BadRequestException('Form does not exist');
            }

            return {
                success: true,
                message: 'Form retrieved successfully!',
                data: veh_main_req
            }
        } catch (error) {
            this.logger.error(`Error retrieving form: ${error.message}`);
            throw new BadRequestException('An error occured while retrieving form');
        }
    }


     // get all forms
    async get_vehicle_maintenance_request(user: any) {
        try {
            let veh_main_req: any;
    
            if (user.role === Role.ADMIN) {
                // Admin can fetch all records
                veh_main_req = await this.vehmain_req_model.find().exec();
            } else if (user.role === Role.DRIVER) {
                // Driver can only fetch their own records
                veh_main_req = await this.vehmain_req_model.find({ performed_by: user.id }).exec();
            } else {
                throw new BadRequestException('Unauthorized access');
            }
    
            return {
                success: true,
                message: 'Forms retrieved successfully!',
                data: veh_main_req
            };
        } catch (error) {
            this.logger.error(`Error retrieving forms: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving forms');
        }
    }
}
