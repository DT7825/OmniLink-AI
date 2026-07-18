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

import { CitizenService } from './citizen.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { CreateCitizenProfileDto } from './dto/create-citizen-profile.dto';
import { UpdateCitizenProfileDto } from './dto/update-citizen-profile.dto';

@ApiTags('Citizen')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('citizen')
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) {}

  @Post('profile')
  createProfile(
    @Req() req: any,
    @Body() dto: CreateCitizenProfileDto,
  ) {
    return this.citizenService.createProfile(req.user.userId, dto);
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return this.citizenService.getProfile(req.user.userId);
  }

  @Patch('profile')
  updateProfile(
    @Req() req: any,
    @Body() dto: UpdateCitizenProfileDto,
  ) {
    return this.citizenService.updateProfile(req.user.userId, dto);
  }
}

