import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user.schema";

export type MonthlyChecklistDocument = MonthlyChecklist & Document; 

@Schema({ timestamps: true })
export class MonthlyChecklist {
  @Prop({
    required: true,
  })
  veh_name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' }) 
    performed_by_user: Types.ObjectId;

  @Prop({
    required: true,
  })
  date: string;

  @Prop({
    required: true,
  })
  checked_by: string;

  @Prop({
    required: true,
  })
  current_mileage: number;

  @Prop({
    required: true,
  })
  date_of_last_oil_change: string;

  @Prop({
    required: true,
  })
  date_of_last_oil_filter_change: string;

  @Prop({
    required: true,
  })
  date_of_last_air_filter_change: string;

  @Prop({
    required: true,
  })
  date_of_carbin_filter_change: string;

  @Prop({
    required: true,
  })
  date_engine_tune_up: string;

  @Prop({
    required: true,
  })
  mileage_of_last_oil_change: number;

  @Prop({
    required: true,
  })
  mileage_of_last_air_filter_change: number;

  @Prop({
    required: true,
  })
  mileage_of_last_tire_rotation: number;

  @Prop({
    type: [
      {
        item: { type: String, required: true },
        status: { type: Number, enum: [0, 1], default: 0 },
        remark: { type: String, required: true },
      },
    ],
    required: true,
    default: () => [
      { item: "check_belt_for_signs_of_fray_or_cracks", status: 0, remark: ""},
      { item: "check_hoses_for_leaks_or_bulges", status: 0, remark: "" },
      { item: "check_engine_and_ground_for_signs_of_leaks", status: 0, remark: "" },
      { item: "make_certain_heater_and_air_conditioning_work", status: 0, remark: "" },
      { item: "check_wipers", status: 0, remark: "" },
      { item: "headlights_high_beam", status: 0, remark: "" },
      { item: "headlights_low_beam", status: 0, remark: "" },
      { item: "fog_or_driving_lights", status: 0, remark: "" },
      { item: "turn_signal", status: 0, remark: "" },
      { item: "brake_light_tail_light", status: 0, remark: "" },
      { item: "hazard_lights", status: 0, remark: "" },
      { item: "door_locks", status: 0, remark: "" },
      { item: "windows_windshield_function_or_cracks", status: 0, remark: "" },
      { item: "radio", status: 0, remark: "" },
      { item: "horn", status: 0, remark: "" },
      { item: "tires_tread_condition", status: 0, remark: "" },
      { item: "tires_proper_inflation", status: 0, remark: "" },
      { item: "fire_extinguisher", status: 0, remark: "" },
      { item: "first_aid_kit", status: 0, remark: "" },
      { item: "accident_information_packet_in_glove_box", status: 0, remark: "" },
      { item: "liquid_level_check", status: 0, remark: "" },
      { item: "coolant", status: 0, remark: "" },
      { item: "oil", status: 0, remark: "" },
      { item: "auto_transmission", status: 0, remark: "" },
      { item: "power_steering", status: 0, remark: "" },
      { item: "brakes", status: 0, remark: "" },
      { item: "window_washer", status: 0, remark: "" },
    ],
  })
  checklist_items: {
    item: string;
    status: number;
    remark: string;
  }[];
}

export const MonthlyChecklistSchema = SchemaFactory.createForClass(MonthlyChecklist);



[
  "horn",
  "fuel_gauge",
  "air_pressure",
  "oil_pressure",
  "water_temperature",
  "windshield_wiper",
  "windshield_washer",
  "light_monitor_system",
  "mirror_adjustment",
  "radio_check",
  "clutch",
  "ignition_switch",
  "brake_test",
  "speedometer_tachometer",
  "other"
]


