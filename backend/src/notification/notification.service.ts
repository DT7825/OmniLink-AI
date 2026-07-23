import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createNotification(
    dto: CreateNotificationDto,
  ) {
    const receiver = await this.prisma.user.findUnique({
      where: {
        id: dto.receiverId,
      },
    });

    if (!receiver) {
      throw new NotFoundException(
        'Receiver not found',
      );
    }

    if (dto.senderId) {
      const sender = await this.prisma.user.findUnique({
        where: {
          id: dto.senderId,
        },
      });

      if (!sender) {
        throw new NotFoundException(
          'Sender not found',
        );
      }
    }

    if (dto.emergencyId) {
      const emergency =
        await this.prisma.emergencyRequest.findUnique({
          where: {
            id: dto.emergencyId,
          },
        });

      if (!emergency) {
        throw new NotFoundException(
          'Emergency request not found',
        );
      }
    }

    return this.prisma.notification.create({
      data: {
        title: dto.title,
        message: dto.message,
        type: dto.type,
        priority: dto.priority,
        receiverId: dto.receiverId,
        senderId: dto.senderId,
        emergencyId: dto.emergencyId,
      },
      include: {
        receiver: true,
        sender: true,
        emergency: true,
      },
    });
  }

  async getMyNotifications(
    userId: string,
  ) {
    return this.prisma.notification.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: true,
        emergency: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getNotificationById(
    id: string,
    userId: string,
  ) {
    const notification =
      await this.prisma.notification.findUnique({
        where: {
          id,
        },
        include: {
          sender: true,
          emergency: true,
        },
      });

    if (!notification) {
      throw new NotFoundException(
        'Notification not found',
      );
    }

    if (notification.receiverId !== userId) {
      throw new ForbiddenException(
        'Access denied',
      );
    }

    return notification;
  }
  async updateNotification(
    id: string,
    userId: string,
    dto: UpdateNotificationDto,
  ) {
    const notification = await this.getNotificationById(
      id,
      userId,
    );

    return this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        ...dto,
      },
      include: {
        sender: true,
        emergency: true,
      },
    });
  }

  async markAsRead(
    id: string,
    userId: string,
  ) {
    await this.getNotificationById(id, userId);

    return this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(
    userId: string,
  ) {
    await this.prisma.notification.updateMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return {
      message:
        'All notifications marked as read',
    };
  }

  async deleteNotification(
    id: string,
    userId: string,
  ) {
    await this.getNotificationById(id, userId);

    await this.prisma.notification.delete({
      where: {
        id,
      },
    });

    return {
      message:
        'Notification deleted successfully',
    };
  }
}
