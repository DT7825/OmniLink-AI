import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateDonorProfileDto {
  @ApiProperty({
    example: 'A+',
  })
  @IsString()
  bloodGroup!: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    example: '2026-05-20',
  })
  @IsOptional()
  @IsDateString()
  lastDonationDate?: string;

  @ApiProperty({
    example: '221B Baker Street',
  })
  @IsString()
  address!: string;

  @ApiProperty({
    example: 'Jaipur',
  })
  @IsString()
  city!: string;

  @ApiProperty({
    example: 'Rajasthan',
  })
  @IsString()
  state!: string;

  @ApiProperty({
    example: '302017',
  })
  @IsString()
  pinCode!: string;
}
