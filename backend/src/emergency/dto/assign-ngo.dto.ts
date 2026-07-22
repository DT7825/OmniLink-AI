import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignNgoDto {
  @ApiProperty({
    example: 'cmrabc123xyz456',
    description: 'NGO User ID',
  })
  @IsString()
  @IsNotEmpty()
  ngoId!: string;
}