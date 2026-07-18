import { PartialType } from '@nestjs/mapped-types';
import { CreateCitizenProfileDto } from './create-citizen-profile.dto';

export class UpdateCitizenProfileDto extends PartialType(
  CreateCitizenProfileDto,
) {}
