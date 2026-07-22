import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { AssignVolunteerDto } from './dto/assign-volunteer.dto';
import { AssignNgoDto } from './dto/assign-ngo.dto';

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
  async assignVolunteer(
  emergencyId: string,
  dto: AssignVolunteerDto,
) {
  const emergency = await this.prisma.emergencyRequest.findUnique({
    where: { id: emergencyId },
  });

  if (!emergency) {
    throw new NotFoundException('Emergency request not found');
  }

  const volunteer = await this.prisma.user.findUnique({
    where: { id: dto.volunteerId },
  });

  if (!volunteer) {
    throw new NotFoundException('Volunteer not found');
  }

  return this.prisma.emergencyRequest.update({
    where: { id: emergencyId },
    data: {
      assignedVolunteerId: dto.volunteerId,
      assignedAt: new Date(),
      status: 'ASSIGNED',
    },
    include: {
      assignedVolunteer: true,
    },
  });
}

async removeVolunteer(emergencyId: string) {
  const emergency = await this.prisma.emergencyRequest.findUnique({
    where: { id: emergencyId },
  });

  if (!emergency) {
    throw new NotFoundException('Emergency request not found');
  }

  return this.prisma.emergencyRequest.update({
    where: { id: emergencyId },
    data: {
      assignedVolunteerId: null,
      assignedAt: null,
      status: 'OPEN',
    },
  });
}

async getAssignedVolunteer(emergencyId: string) {
  const emergency = await this.prisma.emergencyRequest.findUnique({
    where: { id: emergencyId },
    include: {
      assignedVolunteer: true,
    },
  });

  if (!emergency) {
    throw new NotFoundException('Emergency request not found');
  }

  return emergency.assignedVolunteer;
}
async assignNgo(emergencyId: string, dto: AssignNgoDto) {
  const emergency = await this.prisma.emergencyRequest.findUnique({
    where: { id: emergencyId },
  });

  if (!emergency) {
    throw new NotFoundException('Emergency request not found');
  }

  const ngo = await this.prisma.user.findUnique({
    where: { id: dto.ngoId },
  });

  if (!ngo || ngo.role !== 'NGO') {
    throw new NotFoundException('NGO not found');
  }

  return this.prisma.emergencyRequest.update({
    where: { id: emergencyId },
    data: {
      assignedNgoId: dto.ngoId,
      assignedNgoAt: new Date(),
      status: 'ASSIGNED',
    },
    include: {
      assignedNgo: true,
    },
  });
}

async removeNgo(emergencyId: string) {
  const emergency = await this.prisma.emergencyRequest.findUnique({
    where: { id: emergencyId },
  });

  if (!emergency) {
    throw new NotFoundException('Emergency request not found');
  }

  return this.prisma.emergencyRequest.update({
    where: { id: emergencyId },
    data: {
      assignedNgoId: null,
      assignedNgoAt: null,
    },
  });
}

async getAssignedNgo(emergencyId: string) {
  const emergency = await this.prisma.emergencyRequest.findUnique({
    where: { id: emergencyId },
    include: {
      assignedNgo: true,
    },
  });

  if (!emergency) {
    throw new NotFoundException('Emergency request not found');
  }

  return emergency.assignedNgo;
}
} 
