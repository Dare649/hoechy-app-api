import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user.schema";

export type DailyInspectionDocument = DailyInspection & Document;

@Schema({ timestamps: true })
export class DailyInspection {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' }) 
    performed_by_user: Types.ObjectId;

    @Prop({
      required: true,
    })
    date: string;

    @Prop({
        required: true,
    })
    driver_name: string;

    @Prop({
        required: true,
    })
    total_mileage: number;

    

    @Prop({
        type: [
          {
            item: { type: String, required: true },
            status: { type: Number, enum: [0, 1], default: 0 },
          },
        ],
        required: true,
        default: () => [
          { item: "engine_performance", status: 0},
          { item: "engine_smoke", status: 0 },
          { item: "engine_fuel_consumption", status: 0 },
          { item: "leaks", status: 0 },
          { item: "steering_system_front_axle", status: 0 },
          { item: "service_brakes", status: 0 },
          { item: "parking_brakes", status: 0 },
          { item: "springs", status: 0 },
          { item: "exhaust_system", status: 0 },
          { item: "charging_system", status: 0 },
          { item: "fender_mirror", status: 0 },
          { item: "rear_view_mirror", status: 0 },
          { item: "tyres_and_wheels", status: 0 },
          { item: "windows", status: 0 },
          { item: "battery_compartment", status: 0 },
          { item: "clearance_light_marker", status: 0 },
          { item: "fuel_cap", status: 0 },
          { item: "entrance_door", status: 0 },
          { item: "stop_arm", status: 0 },
          
        ],
      })
      general_items: {
        item: string;
        status: number;
        remark: string;
    }[];

    @Prop({
        type: [
          {
            item: { type: String, required: true },
            status: { type: Number, enum: [0, 1], default: 0 },
          },
        ],
        required: true,
        default: () => [
          { item: "windows", status: 0},
          { item: "alternating_flashers", status: 0 },
          { item: "turn_signals", status: 0 },
          { item: "windshield", status: 0 },
          { item: "emergency_door", status: 0 },
          { item: "crossover_mirror", status: 0 },
          { item: "head_light", status: 0 },
          { item: "stop_light", status: 0 },
          { item: "license_plate", status: 0 },
          { item: "inspection_sticker", status: 0 },
          { item: "fire_extinguisher", status: 0 },
          { item: "first_aid_kit", status: 0 },
          { item: "seat_belts", status: 0 },
          { item: "wheel", status: 0 },
        ],
      })
      front_rare_items: {
        item: string;
        status: number;
        remark: string;
    }[];

    @Prop({
        type: [
          {
            item: { type: String, required: true },
            status: { type: Number, enum: [0, 1], default: 0 },
          },
        ],
        required: true,
        default: () => [
          { item: "horn", status: 0},
          { item: "fuel_gauge", status: 0 },
          { item: "air_pressure", status: 0 },
          { item: "oil_pressure", status: 0 },
          { item: "water_temperature", status: 0 },
          { item: "windshield_wiper", status: 0 },
          { item: "windshield_washer", status: 0 },
          { item: "light_monitor_system", status: 0 },
          { item: "mirror_adjustment", status: 0 },
          { item: "radio_check", status: 0 },
          { item: "clutch", status: 0 },
          { item: "ignition_switch", status: 0 },
          { item: "brake_test", status: 0 },
          { item: "speedometer_tachometer", status: 0 },
          { item: "other", status: 0 },
        ],
      })
      driver_area_items: {
        item: string;
        status: number;
        remark: string;
    }[];
}


export const DailyInspectionSchema = SchemaFactory.createForClass(DailyInspection);