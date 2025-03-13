import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber} from "class-validator";


export class VehMainDto {
    @ApiProperty({
        example: 'toyota'
    })
    @IsString()
    @IsNotEmpty()
    make: string;

    @ApiProperty({
        example: 'muscle'
    })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({
        example: 2020
    })
    @IsNumber()
    @IsNotEmpty()
    year: number;

    @ApiProperty({
        example: 'ER208'
    })
    @IsString()
    @IsNotEmpty()
    veh_id_number: string;

    @ApiProperty({
        example: 'ER208WWrte43'
    })
    @IsString()
    @IsNotEmpty()
    engine: string;

    @ApiProperty({
        example: '2024-08-21',
    })
    @IsString()
    @IsNotEmpty()
    date_of_service: Date;

    @ApiProperty({
        example: 123455,
    })
    @IsNumber()
    @IsNotEmpty()
    milage_of_service: number;

    @ApiProperty({
        example: 'damijo williams'
    })
    @IsString()
    @IsNotEmpty()
    performed_by: string;

    @ApiProperty({
        example: 'damijo williams'
    })
    @IsString()
    @IsNotEmpty()
    work_performed_by_service_schedule: string;

    @ApiProperty({
        example: 10000
    })
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({
        example: 'AI0001'
    })
    @IsString()
    @IsNotEmpty()
    invoice: string;

    @ApiProperty({
        example: 'Notes'
    })
    @IsString()
    @IsNotEmpty()
    notes: string;


}