import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

class ApprovedByDto {
    @ApiProperty({
        example: "tayo adebayo",
    })
    @IsString()
    @IsNotEmpty()
    approval_name: string;

    @ApiProperty({
        example: "manager 2",
    })
    @IsString()
    @IsNotEmpty()
    designation: string;
}

class TaskItemDto {
    @ApiProperty({
        example: "make sales",
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: "john doe",
    })
    @IsString()
    @IsNotEmpty()
    responsibility_delegate: string;

    @ApiProperty({
        example: "ongoing",
    })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({
        example: "customers sending me back home",
    })
    @IsString()
    @IsNotEmpty()
    challenges: string;

    @ApiProperty({
        example: "will go with my boss",
    })
    @IsString()
    @IsNotEmpty()
    recovery_plan: string;

    @ApiProperty({
        example: "this is a test",
    })
    @IsString()
    @IsNotEmpty()
    comment_remark: string;

    @ApiProperty({
        type: [ApprovedByDto],
        description: "List of approvals for the task",
        example: [
            {
                approval_name: "tayo adebayo",
                designation: "manager 2"
            },
            {
                approval_name: "jane smith",
                designation: "team lead"
            }
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ApprovedByDto)
    approved_by: ApprovedByDto[];
}

export class EmployeeActivityReportDto {
    @ApiProperty({
        example: "64f5c8b7a3e7a8d7b6f5e4c3",
    })
    @IsMongoId()
    @IsNotEmpty()
    performed_by_user: string;

    @ApiProperty({
        example: "dayo charles",
    })
    @IsString()
    @IsNotEmpty()
    employee_name: string;

    @ApiProperty({
        example: "sales",
    })
    @IsString()
    @IsNotEmpty()
    department: string;

    @ApiProperty({
        example: "sales officer",
    })
    @IsString()
    @IsNotEmpty()
    designation: string;

    @ApiProperty({
        example: "tomi alake",
    })
    @IsString()
    @IsNotEmpty()
    supervisor: string;

    @ApiProperty({
        example: "2023-11-13",
    })
    @IsDateString()
    @IsNotEmpty()
    date_of_reporting: string;

    @ApiProperty({
        example: "11-2023",
    })
    @IsString()
    @IsNotEmpty()
    week: string;

    @ApiProperty({
        type: [TaskItemDto],
        description: "List of task items in the report",
        example: [
            {
                description: "make sales",
                responsibility_delegate: "john doe",
                status: "ongoing",
                challenges: "customers sending me back home",
                recovery_plan: "will go with my boss",
                comment_remark: "this is a test",
                approved_by: [
                    { approval_name: "tayo adebayo", designation: "manager 2" }
                ]
            }
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TaskItemDto)
    task_items: TaskItemDto[];
}
