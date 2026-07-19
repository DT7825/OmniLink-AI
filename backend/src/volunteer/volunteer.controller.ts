import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { VolunteerService } from './volunteer.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { CreateVolunteerProfileDto } from './dto/create-volunteer-profile.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer-profile.dto';

@ApiTags('Volunteer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('volunteer')
export class VolunteerController {
  constructor(
    private readonly volunteerService: VolunteerService,
  ) {}

  @Post('profile')
  createProfile(
    @Req() req: any,
    @Body() dto: CreateVolunteerProfileDto,
  ) {
    return this.volunteerService.createProfile(
      req.user.userId,
      dto,
    );
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return this.volunteerService.getProfile(
      req.user.userId,
    );
  }

  @Patch('profile')
  updateProfile(
    @Req() req: any,
    @Body() dto: UpdateVolunteerProfileDto,
  ) {
    return this.volunteerService.updateProfile(
      req.user.userId,
      dto,
    );
  }
}
