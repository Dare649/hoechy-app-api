import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsMongoId } from "class-validator";

export class VehMainDto {
    @ApiProperty({ example: 'toyota' })
    @IsString()
    @IsNotEmpty()
    make: string;

    @ApiProperty({ example: 'muscle' })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ example: 2020 })
    @IsNumber()
    @IsNotEmpty()
    year: number;

    @ApiProperty({ example: 'ER208' })
    @IsString()
    @IsNotEmpty()
    veh_id_number: string;

    @ApiProperty({ example: 'ER208WWrte43' })
    @IsString()
    @IsNotEmpty()
    engine: string;

    @ApiProperty({ example: '2024-08-21' })
    @IsString()
    @IsNotEmpty()
    date_of_service: Date;

    @ApiProperty({ example: 123455 })
    @IsNumber()
    @IsNotEmpty()
    milage_of_service: number;

    @ApiProperty({ example: 'damijo williams' })
    @IsString()
    @IsNotEmpty()
    performed_by_name: string; // Manually entered performer name

    @ApiProperty({ example: '64f5c8b7a3e7a8d7b6f5e4c3' })
    @IsMongoId()
    @IsNotEmpty()
    performed_by_user: string; // Reference to a User (ObjectId)

    @ApiProperty({ example: 'Oil Change & Tire Rotation' })
    @IsString()
    @IsNotEmpty()
    work_performed_by_service_schedule: string;

    @ApiProperty({ example: 10000 })
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ example: 'AI0001' })
    @IsString()
    @IsNotEmpty()
    invoice: string;

    @ApiProperty({ example: 'Notes' })
    @IsString()
    @IsNotEmpty()
    notes: string;
}
