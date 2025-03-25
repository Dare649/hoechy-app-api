import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsArray, ValidateNested, IsMongoId } from "class-validator";
import { Type } from "class-transformer";


export class GeneralItemDto {
    @ApiProperty({
        example: "engine_performance",
    })
    @IsNotEmpty()
    @IsString()
    item: string;

    
    @ApiProperty({
        example: 0,
        description: "The status of the checklist item. x for Not Okay, o for Okay.",
    })
    @IsNotEmpty()
    @IsEnum([0, 1])
    status: number;
}

export class FrontRareItemDto {
    @ApiProperty({
        example: "license_plate",
    })
    @IsNotEmpty()
    @IsString()
    item: string;

    
    @ApiProperty({
        example: 0,
        description: "The status of the checklist item. x for Not Okay, o for Okay.",
    })
    @IsNotEmpty()
    @IsEnum([0, 1])
    status: number;
}

export class DriverAreaItemDto {
    @ApiProperty({
        example: "ignition_switch",
    })
    @IsNotEmpty()
    @IsString()
    item: string;

    
    @ApiProperty({
        example: 0,
        description: "The status of the checklist item. x for Not Okay, o for Okay.",
    })
    @IsNotEmpty()
    @IsEnum([0, 1])
    status: number;
}


export class DailyInspectionDto {
    @ApiProperty({
        example: "2025-12-05"
    })
    @IsNotEmpty()
    @IsString()
    date: string;

    @ApiProperty({ example: '64f5c8b7a3e7a8d7b6f5e4c3' })
    @IsMongoId()
    @IsNotEmpty()
    performed_by_user: string; 

    @ApiProperty({ example: 'tola' })
    @IsString()
    @IsNotEmpty()
    driver_name: string; 

    @ApiProperty({ example: 9009999 })
    @IsNumber()
    @IsNotEmpty()
    total_mileage: number; 

    @ApiProperty({
            type: [GeneralItemDto],
            description: "An array of general inspection items with their status.",
            default: [
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GeneralItemDto)
    general_items: GeneralItemDto[];

    @ApiProperty({
        type: [DriverAreaItemDto],
        description: "An array of driver area inspection items with their status.",
        default: [
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DriverAreaItemDto)
    driver_area_items: DriverAreaItemDto[];

    @ApiProperty({
        type: [FrontRareItemDto],
        description: "An array of driver area inspection items with their status.",
        default: [
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FrontRareItemDto)
    front_rare_items: FrontRareItemDto[];


}