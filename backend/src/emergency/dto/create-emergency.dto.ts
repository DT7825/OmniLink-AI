import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  EmergencyCategory,
  EmergencyPriority,
} from '@prisma/client';


export class CreateEmergencyDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(EmergencyCategory)
  category!: EmergencyCategory;

  @IsOptional()
  @IsEnum(EmergencyPriority)
  priority?: EmergencyPriority;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  pinCode!: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsString()
  contactName!: string;

  @IsPhoneNumber()
  contactPhone!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100000)
  peopleAffected?: number;

  @IsOptional()
  @IsBoolean()
  requiresMedicalAid?: boolean;

  @IsOptional()
  @IsBoolean()
  requiresBlood?: boolean;

  @IsOptional()
  @IsBoolean()
  requiresFood?: boolean;

  @IsOptional()
  @IsBoolean()
  requiresShelter?: boolean;

  @IsOptional()
  @IsBoolean()
  requiresTransportation?: boolean;
}
