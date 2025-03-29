import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsMongoId, 
  IsArray, 
  ValidateNested, 
  IsObject 
} from 'class-validator';
import { Type } from 'class-transformer';

class EquipmentOnSiteDto {
  @ApiProperty({ description: 'Equipment description', example: 'Crane' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Unit of Measurement', example: 'unit' })
  @IsNotEmpty()
  @IsString()
  UOM: string;

  @ApiProperty({ description: 'Quantity', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @ApiProperty({ description: 'Status', example: 'Operational' })
  @IsNotEmpty()
  @IsString()
  status: string;
}

class MaterialOnSiteDto {
  @ApiProperty({ description: 'Material description', example: 'Concrete' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Unit of Measurement', example: 'cubic meter' })
  @IsNotEmpty()
  @IsString()
  UOM: string;

  @ApiProperty({ description: 'Quantity', example: 50 })
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @ApiProperty({ description: 'Remarks', example: 'Sufficient' })
  @IsNotEmpty()
  @IsString()
  remark: string;
}

class ActivityDto {
  @ApiProperty({ description: 'Activity description', example: 'Foundation Work' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Challenges', example: 'Weather delay' })
  @IsNotEmpty()
  @IsString()
  challenges: string;

  @ApiProperty({ description: 'Recovery Plan', example: 'Extra shifts' })
  @IsNotEmpty()
  @IsString()
  recovery_plan: string;

  @ApiProperty({ description: 'Status', example: 'In Progress' })
  @IsNotEmpty()
  @IsString()
  status: string;
}

class ConfirmedByDto {
  @ApiProperty({ description: 'Name of the confirmer', example: 'Alice Brown' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Department of the confirmer', example: 'Quality Assurance' })
  @IsNotEmpty()
  @IsString()
  department: string;
}

export class DailySiteReportDto {
  @ApiProperty({ description: 'Employee Name', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  emp_name: string;

  @ApiProperty({ description: 'ID of the user who performed the activity', example: '60d0fe4f5311236168a109ca' })
  @IsNotEmpty()
  @IsMongoId()
  performed_by_user: Types.ObjectId;

  @ApiProperty({ description: 'Department', example: 'Engineering' })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty({ description: 'Designation', example: 'Project Manager' })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({ description: 'Supervisor Name', example: 'Jane Smith' })
  @IsNotEmpty()
  @IsString()
  supervisor: string;

  @ApiProperty({ description: 'Date of Reporting', example: '2023-09-25' })
  @IsNotEmpty()
  @IsString()
  date_of_reporting: string;

  @ApiProperty({ description: 'Project Name', example: 'Project Alpha' })
  @IsNotEmpty()
  @IsString()
  project: string;

  @ApiProperty({ description: 'Title of the report', example: 'Daily Progress Report' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Location', example: 'New York, NY' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Toolbox Topic', example: 'Safety Measures' })
  @IsNotEmpty()
  @IsString()
  toolbox_topic: string;

  @ApiProperty({ description: 'Weather Condition', example: 'Sunny' })
  @IsNotEmpty()
  @IsString()
  weather_condition: string;

  @ApiProperty({ description: 'Project Progress Percentage', example: '75%' })
  @IsNotEmpty()
  @IsString()
  project_progress_percentage: string;

  @ApiProperty({ description: 'Man Hour', example: 120 })
  @IsNotEmpty()
  @IsNumber()
  man_hour: number;

  @ApiProperty({ description: 'Personnel on Site', example: 15 })
  @IsNotEmpty()
  @IsNumber()
  personnel_on_site: number;

  @ApiProperty({ description: 'Client Name', example: 'ABC Corp' })
  @IsNotEmpty()
  @IsString()
  client: string;

  @ApiProperty({ description: 'Project Start Date', example: '2023-01-01' })
  @IsNotEmpty()
  @IsString()
  project_start_date: string;

  @ApiProperty({ description: 'Proposed End Date', example: '2023-12-31' })
  @IsNotEmpty()
  @IsString()
  proposed_end_date: string;

  @ApiProperty({ description: 'Project Number', example: 'PJT-2023-001' })
  @IsNotEmpty()
  @IsString()
  project_no: string;

  @ApiProperty({ description: 'Client Representative on Site', example: 'Michael Johnson' })
  @IsNotEmpty()
  @IsString()
  client_rep_on_site: string;

  @ApiProperty({ description: 'Equipment on Site', type: [EquipmentOnSiteDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => EquipmentOnSiteDto)
  equipment_on_site: EquipmentOnSiteDto[];

  @ApiProperty({ description: 'Materials on Site', type: [MaterialOnSiteDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => MaterialOnSiteDto)
  material_on_site: MaterialOnSiteDto[];

  @ApiProperty({ description: 'Activity Report', type: [ActivityDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ActivityDto)
  activity_report: ActivityDto[];

  @ApiProperty({ description: 'Activities for Next Day', type: [ActivityDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ActivityDto)
  activity_for_next_day: ActivityDto[];

  @ApiProperty({ description: 'Complaint Challenges', example: 'Equipment breakdown' })
  @IsNotEmpty()
  @IsString()
  complaint_challenges: string;

  @ApiProperty({ description: 'Incident or Accident Details', example: 'Minor injury reported' })
  @IsNotEmpty()
  @IsString()
  incident_accident: string;

  @ApiProperty({ description: 'General Remark', example: 'Work progressing well' })
  @IsNotEmpty()
  @IsString()
  remark: string;

  @ApiProperty({ description: 'Confirmed By', type: [ConfirmedByDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConfirmedByDto)
  confirmed_by: ConfirmedByDto[];
}
