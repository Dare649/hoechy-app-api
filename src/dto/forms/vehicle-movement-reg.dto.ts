import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsMongoId } from "class-validator";



export class VehMovementRegDto {

    @ApiProperty({
            example: "64f5c8b7a3e7a8d7b6f5e4c3",
    })
    @IsMongoId()
    @IsNotEmpty()
    performed_by_user: string;

    @ApiProperty({
        example: '122OOD1'
    })
    @IsString()
    @IsNotEmpty()
    veh_number: string;

    @ApiProperty({
        example: 'may'
    })
    @IsString()
    @IsNotEmpty()
    month: string;

    @ApiProperty({
        example: '02-may'
    })
    @IsString()
    @IsNotEmpty()
    week: string;

    @ApiProperty({
        example: '2025-11-02'
    })
    @IsString()
    @IsNotEmpty()
    date_from: string;

    @ApiProperty({
        example: '2025-12-02'
    })
    @IsString()
    @IsNotEmpty()
    date_to: string;

    @ApiProperty({
        example: 122203
    })
    @IsNumber()
    @IsNotEmpty()
    meter_start: number;

    @ApiProperty({
        example: 122250
    })
    @IsNumber()
    @IsNotEmpty()
    meter_end: number;

    @ApiProperty({
        example: 50
    })
    @IsNumber()
    @IsNotEmpty()
    km: number;

    @ApiProperty({
        example: 50
    })
    @IsString()
    @IsNotEmpty()
    security_name: string;

}