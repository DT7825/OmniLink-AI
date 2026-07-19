import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNgoProfileDto {
  @IsString()
  ngoName!: string;

  @IsOptional()
  @IsString()
  registrationNo?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  pinCode!: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
