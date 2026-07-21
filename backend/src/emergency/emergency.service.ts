import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@Injectable()
export class EmergencyService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmergency(
    userId: string,
    dto: CreateEmergencyDto,
  ) {
    return this.prisma.emergencyRequest.create({
      data: {
        ...dto,
        createdById: userId,
      },
    });
  }

  async getMyEmergencies(userId: string) {
    return this.prisma.emergencyRequest.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEmergencyById(id: string) {
    const emergency = await this.prisma.emergencyRequest.findUnique({
      where: {
        id,
      },
    });

    if (!emergency) {
      throw new NotFoundException('Emergency request not found');
    }

    return emergency;
  }
    async updateEmergency(
    id: string,
    userId: string,
    dto: UpdateEmergencyDto,
  ) {
    const emergency = await this.getEmergencyById(id);

    if (emergency.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this emergency request',
      );
    }

    return this.prisma.emergencyRequest.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteEmergency(
    id: string,
    userId: string,
  ) {
    const emergency = await this.getEmergencyById(id);

    if (emergency.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this emergency request',
      );
    }

    await this.prisma.emergencyRequest.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Emergency request deleted successfully',
    };
  }
}
