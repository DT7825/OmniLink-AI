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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('Notification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Notification',
  })
  create(
    @Body() dto: CreateNotificationDto,
  ) {
    return this.notificationService.createNotification(
      dto,
    );
  }

  @Get('my')
  @ApiOperation({
    summary: 'Get My Notifications',
  })
  getMine(
    @Request() req,
  ) {
    return this.notificationService.getMyNotifications(
      req.user.userId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Notification By Id',
  })
  getOne(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.notificationService.getNotificationById(
      id,
      req.user.userId,
    );
  }

  @Patch('read-all')
markAllRead(
  @Request() req,
) {

  return this.notificationService.markAllAsRead(
    req.user.userId,
  );
}

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Notification',
  })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationService.updateNotification(
      id,
      req.user.userId,
      dto,
    );
  }

  @Patch(':id/read')
  @ApiOperation({
    summary: 'Mark Notification As Read',
  })
  markRead(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.notificationService.markAsRead(
      id,
      req.user.userId,
    );
  }

  

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Notification',
  })
  remove(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.notificationService.deleteNotification(
      id,
      req.user.userId,
    );
  }
}
