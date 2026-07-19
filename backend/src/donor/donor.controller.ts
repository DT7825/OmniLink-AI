import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { CreateDonorProfileDto } from './dto/create-donor-profile.dto';
import { UpdateDonorProfileDto } from './dto/update-donor-profile.dto';
import { DonorService } from './donor.service';

@ApiTags('Donor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post('profile')
  createProfile(
    @Req() req,
    @Body() dto: CreateDonorProfileDto,
  ) {
    return this.donorService.createProfile(
      req.user.userId,
      dto,
    );
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.donorService.getProfile(
      req.user.userId,
    );
  }

  @Patch('profile')
  updateProfile(
    @Req() req,
    @Body() dto: UpdateDonorProfileDto,
  ) {
    return this.donorService.updateProfile(
      req.user.userId,
      dto,
    );
  }
}