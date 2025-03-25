import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsMongoId } from "class-validator";


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
    @IsString()
    @IsNotEmpty()
    filled_by: string;

    @ApiProperty({
        example: '2023-11-03'
    })
    @IsString()
    @IsNotEmpty()
    report_date: string;

    @ApiProperty({
        example: 'notes'
    })
    @IsString()
    @IsNotEmpty()
    mechanic_notes: string;

    @ApiProperty({
        example: 'description'
    })
     @IsString()
    @IsNotEmpty()
    description_of_problem: string;

    @ApiProperty({ example: '64f5c8b7a3e7a8d7b6f5e4c3' })
    @IsMongoId()
    @IsNotEmpty()
    performed_by_user?: string; // Reference to a User id


    @ApiProperty({
        example: '2023-11-03'
    })
     @IsString()
    @IsNotEmpty()
    completed_date: string;

    @ApiProperty({
        example: 'funke'
    })
     @IsString()
    @IsNotEmpty()
    mechanic_name: string;
}