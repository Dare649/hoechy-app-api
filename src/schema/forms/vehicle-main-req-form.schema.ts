import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VehMainReqDocument = VehMainReq & Document;

@Schema({
    timestamps: true
})
export class VehMainReq {
    @Prop({
        required: true,
    })
    veh_number: string;

    @Prop({
        required: true,
    })
    filled_by: string;

    @Prop({
        required: true,
    })
    report_date: string;

    @Prop({
        required: true,
    })
    mechanic_notes: string;

    @Prop({
        required: true,
    })
    description_of_problem: string;

    @Prop({
        required: true,
    })
    completed_date: string;

    @Prop({
        required: true,
    })
    mechanic_name: string;
}

export const VehMainReqSchema = SchemaFactory.createForClass(VehMainReq);