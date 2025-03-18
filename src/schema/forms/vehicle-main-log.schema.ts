import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user.schema";

export type VehMainDocument = VehMain & Document;

@Schema({ timestamps: true })
export class VehMain {

    @Prop({ required: true })
    make: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' }) // ✅ Properly reference MongoDB ObjectId
    performed_by_user: Types.ObjectId;

    // Manually entered name of the person performing the service
    @Prop({ required: true })
    performed_by_name: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    year: number;

    @Prop({ required: true })
    veh_id_number: string;

    @Prop({ required: true })
    engine: string;

    @Prop({ required: true })
    date_of_service: string;

    @Prop({ required: true })
    milage_of_service: number;

    @Prop({ required: true })
    work_performed_by_service_schedule: string;

    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    invoice: string;

    @Prop({ required: true })
    notes: string;
}

export const VehMainSchema = SchemaFactory.createForClass(VehMain);
