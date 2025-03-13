import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class VehMainReqDto {
    @ApiProperty({
        example: '12ODS22'
    })
    @IsString()
    @IsNotEmpty()
    veh_number: string;

    @ApiProperty({
        example: 'thomas makinde'
    })
    filled_by: string;

    @ApiProperty({
        example: '2023-11-03'
    })
    report_date: string;

    @ApiProperty({
        example: 'notes'
    })
    mechanic_notes: string;

    @ApiProperty({
        example: 'description'
    })
    description_of_problem: string;

    @ApiProperty({
        example: '2023-11-03'
    })
    completed_date: string;

    @ApiProperty({
        example: 'funke'
    })
    mechanic_name: string;
}