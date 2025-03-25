import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsArray, ValidateNested, IsMongoId } from "class-validator";
import { Type } from "class-transformer";

// DTO for individual checklist items
export class ChecklistItemDto {
    @ApiProperty({
      example: "check_belt_for_signs_of_fray_or_cracks",
    })
    @IsNotEmpty()
    @IsString()
    item: string;

    @ApiProperty({
      example: "there was a fault",
    })
    @IsNotEmpty()
    @IsString()
    remark: string;
  
    @ApiProperty({
      example: 0,
      description: "The status of the checklist item. 0 for Not Okay, 1 for Okay.",
    })
    @IsNotEmpty()
    @IsEnum([0, 1])
    status: number;
}
  


export class MonthlyChecklistDto {
    @ApiProperty({
        example: "toyota camry"
    })
    @IsNotEmpty()
    @IsString()
    veh_name: string;

    @ApiProperty({ example: '64f5c8b7a3e7a8d7b6f5e4c3' })
    @IsMongoId()
    @IsNotEmpty()
    performed_by_user: string; 

    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date: string;

    @ApiProperty({
        example: "tola"
    })
    @IsNotEmpty()
    @IsString()
    checked_by: string;

    @ApiProperty({
        example: 22022
    })
    @IsNotEmpty()
    @IsNumber()
    current_mileage: number;

    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date_of_last_oil_change: string;

    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date_of_last_oil_filter_change: string;

    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date_of_last_air_filter_change: string;

    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date_of_carbin_filter_change: string;

    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date_engine_tune_up: string;


    @ApiProperty({
        example: 22022
    })
    @IsNotEmpty()
    @IsNumber()
    mileage_of_last_oil_change: number;

    @ApiProperty({
        example: 22022
    })
    @IsNotEmpty()
    @IsNumber()
    mileage_of_last_air_filter_change: number;

    @ApiProperty({
        example: 22022
    })
    @IsNotEmpty()
    @IsNumber()
    mileage_of_last_tire_rotation: number;

    @ApiProperty({
        type: [ChecklistItemDto],
        description: "An array of checklist items with their status.",
        default: [
          { item: "check_belt_for_signs_of_fray_or_cracks", status: 0, remark: "" },
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ChecklistItemDto)
    checklist_items: ChecklistItemDto[];

}
