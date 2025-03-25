import { Injectable, BadRequestException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { VehMainReqDto } from 'src/dto/forms/vehicle-main-req.dto';
import { VehMainReq, VehMainReqDocument } from 'src/schema/forms/vehicle-main-req-form.schema';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class VehicleMaintenanceReqFormService {
  private readonly logger = new Logger(VehicleMaintenanceReqFormService.name);

  constructor(
    @InjectModel(VehMainReq.name) private readonly veh_main_req_model: Model<VehMainReqDocument>,
  ) {}

  // Create a vehicle maintenance request form
  async create_vehicle_maintenance_request_form(dto: VehMainReqDto) {
    try {
      const veh_main_req = new this.veh_main_req_model({
        ...dto,
        performed_by_user: new Types.ObjectId(dto.performed_by_user),
      });

      const saved_veh_main_req = await veh_main_req.save();

      return {
        success: true,
        message: 'Form created successfully!',
        data: saved_veh_main_req,
      };
    } catch (error) {
      this.logger.error(`Error creating vehicle maintenance request: ${error.message}`);
      throw new BadRequestException('Error creating vehicle maintenance request');
    }
  }

  // Update a vehicle maintenance request form
  async update_vehicle_maintenance_request_form(dto: VehMainReqDto, id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid form ID');
      }

      const existing_veh_main_req = await this.veh_main_req_model.findById(id).exec();

      if (!existing_veh_main_req) {
        throw new BadRequestException('Form does not exist');
      }

      Object.assign(existing_veh_main_req, dto);
      const updated_veh_main_req = await existing_veh_main_req.save();

      return {
        success: true,
        message: 'Form updated successfully!',
        data: updated_veh_main_req,
      };
    } catch (error) {
      this.logger.error(`Error updating form: ${error.message}`);
      throw new BadRequestException('An error occurred while updating the form');
    }
  }

  // Delete a vehicle maintenance request form
  async delete_vehicle_maintenance_request_form(id: string): Promise<any> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid form ID');
      }

      const delete_veh_main_req = await this.veh_main_req_model.findByIdAndDelete(id).exec();

      if (!delete_veh_main_req) {
        throw new BadRequestException('Form does not exist');
      }

      return {
        success: true,
        message: 'Form deleted successfully!',
      };
    } catch (error) {
      this.logger.error(`Error deleting form: ${error.message}`);
      throw new BadRequestException('An error occurred while deleting the form');
    }
  }

  // Get a vehicle maintenance request form by ID
  async get_vehicle_maintenance_request_by_id(id: string): Promise<any> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid form ID');
      }

      const veh_main_req = await this.veh_main_req_model.findById(id).exec();

      if (!veh_main_req) {
        throw new BadRequestException('Form does not exist');
      }

      return {
        success: true,
        message: 'Form retrieved successfully!',
        data: veh_main_req,
      };
    } catch (error) {
      this.logger.error(`Error retrieving form: ${error.message}`);
      throw new BadRequestException('An error occurred while retrieving the form');
    }
  }

  // Get all vehicle maintenance request forms
async get_vehicle_maintenance_request(user: any) {
    try {
      let veh_main_req: any;
  
      if (user.role === Role.ADMIN) {
        // Admin can fetch all records
        veh_main_req = await this.veh_main_req_model.find().exec();
      } else if (user.role === Role.DRIVER) {
        // Driver can only fetch their own records
        veh_main_req = await this.veh_main_req_model.find({
          performed_by_user: new Types.ObjectId(user._id),
        }).exec();
      } else {
        throw new UnauthorizedException('You do not have access to this resource');
      }
  
      if (!veh_main_req || veh_main_req.length === 0) {
        return {
          success: false,
          message: 'No forms found for the specified user',
          data: [],
        };
      }
  
      return {
        success: true,
        message: 'Forms retrieved successfully!',
        data: veh_main_req,
      };
    } catch (error) {
      this.logger.error(`Error retrieving forms: ${error.message}`);
      throw new BadRequestException('An error occurred while retrieving forms');
    }
  }
  
}
