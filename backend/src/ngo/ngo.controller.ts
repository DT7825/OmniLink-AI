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

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { NgoService } from './ngo.service';

import { CreateNgoProfileDto } from './dto/create-ngo-profile.dto';
import { UpdateNgoProfileDto } from './dto/update-ngo-profile.dto';

@ApiTags('NGO')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ngo')
export class NgoController {
  constructor(
    private readonly ngoService: NgoService,
  ) {}

  @Post('profile')
  createProfile(
    @Req() req: any,
    @Body() dto: CreateNgoProfileDto,
  ) {
    return this.ngoService.createProfile(
      req.user.userId,
      dto,
    );
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return this.ngoService.getProfile(
      req.user.userId,
    );
  }

  @Patch('profile')
  updateProfile(
    @Req() req: any,
    @Body() dto: UpdateNgoProfileDto,
  ) {
    return this.ngoService.updateProfile(
      req.user.userId,
      dto,
    );
  }
}
