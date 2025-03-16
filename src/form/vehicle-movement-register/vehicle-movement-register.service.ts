import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehMovementRegDto } from 'src/dto/forms/vehicle-movement-reg.dto';
import { VehMoveReg, VehMoveRegDocument } from 'src/schema/forms/vehicle-movement-register.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class VehicleMovementRegisterService {
    private readonly logger = new Logger(VehicleMovementRegisterService.name);

    constructor(
        @InjectModel(VehMoveReg.name) private veh_move_reg_model: Model<VehMoveRegDocument>,
    ) {}


    // create form
    async create_vehicle_movement_register(dto: VehMovementRegDto) {
        try {
            const veh_move_reg = new this.veh_move_reg_model({
                veh_number: dto.veh_number,
                month: dto.month,
                week: dto.week,
                date_from: dto.date_from,
                date_to: dto.date_to,
                meter_start: dto.meter_start,
                meter_end: dto.meter_end,
                km: dto.km,
                security_name: dto.security_name
            });

            const saved_veh_mov_reg = await veh_move_reg.save();

            return {
                success: true,
                message: 'Form created successfully!',
                data: saved_veh_mov_reg
            }
        } catch (error) {
            this.logger.error('Error creating vehicle movement register')
        }
    }



    // update form
    async update_vehicle_movement_register(dto: VehMovementRegDto, id: string): Promise<any> {
        try {
            const existing_veh_mov_reg = await this.veh_move_reg_model.findById(id).exec();

            if (!existing_veh_mov_reg) {
                throw new BadRequestException('Form does not exist')
            }

            existing_veh_mov_reg.veh_number = dto.veh_number || existing_veh_mov_reg.veh_number;
            existing_veh_mov_reg.month = dto.month || existing_veh_mov_reg.month;
            existing_veh_mov_reg.date_from = dto.date_from || existing_veh_mov_reg.date_from;
            existing_veh_mov_reg.week = dto.week || existing_veh_mov_reg.week;
            existing_veh_mov_reg.date_to = dto.date_to || existing_veh_mov_reg.date_to;
            existing_veh_mov_reg.meter_start = dto.meter_start || existing_veh_mov_reg.meter_start;
            existing_veh_mov_reg.meter_end = dto.meter_end || existing_veh_mov_reg.meter_end;
            existing_veh_mov_reg.km = dto.km || existing_veh_mov_reg.km;
            existing_veh_mov_reg.security_name = dto.security_name || existing_veh_mov_reg.security_name;

            await existing_veh_mov_reg.save();

            return {
                success: true,
                message: 'Form update successfully!'
            }
        } catch (error) {
            this.logger.error(`Error updating form: ${error.message}`);
            throw new BadRequestException('An error occured while updating form');
        }
    }


    // delete form
    async delete_vehicle_movement_register(id: string): Promise<any> {
        try {
            const delete_veh_mov_reg = await this.veh_move_reg_model.findByIdAndDelete(id).exec();

            if (!delete_veh_mov_reg) {
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



    // get form
    async get_vehicle_movement_register_by_id(id: string): Promise<any> {
        try {
            const veh_move_reg = await this.veh_move_reg_model.findById(id).exec();

            if (!veh_move_reg) {
                throw new BadRequestException('Form does not exist');
            }

            return {
                success: true,
                message: 'Form retrieved successfully!',
                data: veh_move_reg
            }
        } catch (error) {
            this.logger.error(`Error retrieving form: ${error.message}`);
            throw new BadRequestException('An error occured while retrieving form');
        }
    }



    // get all forms
    async get_vehicle_movement_register(user: any) {
        try {
            let veh_move_reg: any;
    
            if (user.role === Role.ADMIN) {
                // Admin can fetch all records
                veh_move_reg = await this.veh_move_reg_model.find().exec();
            } else if (user.role === Role.DRIVER) {
                // Driver can only fetch their own records
                veh_move_reg = await this.veh_move_reg_model.find({ performed_by: user.id }).exec();
            } else {
                throw new BadRequestException('Unauthorized access');
            }
    
            return {
                success: true,
                message: 'Forms retrieved successfully!',
                data: veh_move_reg
            };
        } catch (error) {
            this.logger.error(`Error retrieving forms: ${error.message}`);
            throw new BadRequestException('An error occurred while retrieving forms');
        }
    }

}
