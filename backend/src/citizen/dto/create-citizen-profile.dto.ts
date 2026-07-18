import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCitizenProfileDto {
  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  pinCode!: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;
}
