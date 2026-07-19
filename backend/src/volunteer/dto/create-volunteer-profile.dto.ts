import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVolunteerProfileDto {
  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsOptional()
  @IsString()
  availability?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  organization?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
