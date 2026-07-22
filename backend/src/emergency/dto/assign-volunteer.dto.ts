import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignVolunteerDto {
  @ApiProperty({
    example: 'cmrabc123xyz456',
    description: 'Volunteer User ID',
  })
  @IsString()
  @IsNotEmpty()
  volunteerId!: string;
}