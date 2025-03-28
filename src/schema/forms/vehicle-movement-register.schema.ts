import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user.schema";

export type VehMoveRegDocument = VehMoveReg & Document;

@Schema({
    timestamps: true
})
export class VehMoveReg {

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
        performed_by_user: Types.ObjectId;

    @Prop({
        required: true,
    })
    veh_number: string;

    @Prop({
        required: true,
    })
    month: string;

    @Prop({
        required: true,
    })
    week: string;

    @Prop({
        required: true,
    })
    date_from: string;

    @Prop({
        required: true,
    })
    date_to: string;

    @Prop({
        required: true,
    })
    meter_start: number;

    @Prop({
        required: true,
    })
    meter_end: number;

    @Prop({
        required: true,
    })
    km: number;

    @Prop({
        required: true,
    })
    security_name: string;
}


export const VehMoveRegSchema = SchemaFactory.createForClass(VehMoveReg);