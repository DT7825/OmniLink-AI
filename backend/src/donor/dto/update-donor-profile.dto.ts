import { PartialType } from '@nestjs/swagger';
import { CreateDonorProfileDto } from './create-donor-profile.dto';

export class UpdateDonorProfileDto extends PartialType(
  CreateDonorProfileDto,
) {}
