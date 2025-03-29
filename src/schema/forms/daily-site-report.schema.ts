import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user.schema";

export type DailySiteReportDocument = DailySiteReport & Document;


@Schema({ timestamps: true })
export class DailySiteReport {
    @Prop({
        required: true,
    })
    emp_name: string;
    
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' }) 
    performed_by_user: Types.ObjectId;

    @Prop({
        required: true,
    })
    department: string;    

    @Prop({
        required: true,
    })
    designation: string; 

    @Prop({
        required: true,
    })
    supervisor: string;  

    @Prop({
        required: true,
    })
    date_of_reporting: string; 

    @Prop({
        required: true,
    })
    project: string;   

    @Prop({
        required: true,
    })
    title: string; 

    @Prop({
        required: true,
    })
    location: string;
        
    @Prop({
        required: true,
    })
    toolbox_topic: string; 

    @Prop({
        required: true,
    })
    weather_condition: string; 

    @Prop({
        required: true,
    })
    project_progress_percentage: string;  

    @Prop({
        required: true,
    })
    man_hour: number;  
      
    @Prop({
        required: true,
    })
    personnel_on_site: number; 

    @Prop({
        required: true,
    })
    client: string;    

    @Prop({
        required: true,
    })
    project_start_date: string;  

    @Prop({
        required: true,
    })
    proposed_end_date: string;  

    @Prop({
        required: true,
    })
    project_no: string;    

    @Prop({
        required: true,
    })
    client_rep_on_site: string; 

    @Prop({
        type: [
            {
                description: {
                    type: String,
                    required: true,
                },
                UOM: {
                    type: String,
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
    })
    equipment_on_site: Array<{
        description: string;
        UOM: string;
        qty: number;
        status: string;
    }>;

    @Prop({
        type: [
            {
                description: {
                    type: String,
                    required: true,
                },
                UOM: {
                    type: String,
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
                remark: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
    })
    material_on_site: Array<{
        description: string;
        UOM: string;
        qty: number;
        remark: string;
    }>;

    @Prop({
        type: [
            {
                description: {
                    type: String,
                    required: true,
                },
                challenges: {
                    type: String,
                    required: true,
                },
                recovery_plan: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
    })
    activity_report: Array<{
        description: string;
        challenges: string;
        recovery_plan: number;
        status: string;
    }>;

    @Prop({
        type: [
            {
                description: {
                    type: String,
                    required: true,
                },
                challenges: {
                    type: String,
                    required: true,
                },
                recovery_plan: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                },
            }
        ],
        required: true,
    })
    activity_for_next_day: Array<{
        description: string;
        challenges: string;
        recovery_plan: number;
        status: string;
    }>;

    @Prop({
        required: true,
    })
    complaint_challenges: string;

    @Prop({
        required: true,
    })
    incident_accident: string;

    @Prop({
        required: true,
    })
    remark: string; 

    @Prop({
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                department: {
                    type: String,
                    required: true
                },
            },
        ],
        required: true,
    })
    confirmed_by: Array<{
        name: string;
        department: string;
    }>;

}

export const DailySiteReportSchema = SchemaFactory.createForClass(DailySiteReport);