import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user.schema";

export type EmployeeActivityReportDocument = EmployeeActivityReport & Document;

@Schema({ timestamps: true })
export class EmployeeActivityReport {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    performed_by_user: Types.ObjectId;

    @Prop({ required: true })
    employee_name: string;

    @Prop({ required: true })
    department: string;

    @Prop({ required: true })
    designation: string;

    @Prop({ required: true })
    supervisor: string;

    @Prop({ required: true })
    date_of_reporting: string;

    @Prop({ required: true })
    week: string;

    @Prop({
        type: [
            {
                description: {
                    type: String,
                    required: true,
                },
                responsibility_delegate: {
                    type: String,
                    required: true,
                },
                status: {
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
                comment_remark: {
                    type: String,
                    required: true,
                },
                approved_by: {
                    type: [
                        {
                            approval_name: {
                                type: String,
                                required: true,
                            },
                            designation: {
                                type: String,
                                required: true,
                            },
                        },
                    ],
                    required: true,
                },
            },
        ],
        required: true,
    })
    task_items: Array<{
        description: string;
        responsibility_delegate: string;
        status: string;
        challenges: string;
        recovery_plan: string;
        comment_remark: string;
        approved_by: Array<{
            approval_name: string;
            designation: string;
        }>;
    }>;
}

export const EmployeeActivityReportSchema = SchemaFactory.createForClass(EmployeeActivityReport);
