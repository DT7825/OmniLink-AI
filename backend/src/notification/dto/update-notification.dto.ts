import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @ApiPropertyOptional({
    description: 'Mark notification as read or unread',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
