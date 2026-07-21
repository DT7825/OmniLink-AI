import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@ApiTags('Emergency')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('emergency')
export class EmergencyController {
  constructor(
    private readonly emergencyService: EmergencyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Emergency Request' })
  create(
    @Request() req,
    @Body() dto: CreateEmergencyDto,
  ) {
    return this.emergencyService.createEmergency(
      req.user.userId,
      dto,
    );
  }

  @Get('my')
  @ApiOperation({ summary: 'Get My Emergency Requests' })
  getMine(@Request() req) {
    return this.emergencyService.getMyEmergencies(
      req.user.userId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Emergency By Id' })
  getOne(
    @Param('id') id: string,
  ) {
    return this.emergencyService.getEmergencyById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update My Emergency' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateEmergencyDto,
  ) {
    return this.emergencyService.updateEmergency(
      id,
      req.user.userId,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete My Emergency' })
  remove(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.emergencyService.deleteEmergency(
      id,
      req.user.userId,
    );
  }
}