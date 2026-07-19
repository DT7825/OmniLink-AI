import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateVolunteerProfileDto } from './dto/create-volunteer-profile.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer-profile.dto';

@Injectable()
export class VolunteerService {
  constructor(private prisma: PrismaService) {}

  async createProfile(
    userId: string,
    dto: CreateVolunteerProfileDto,
  ) {
    return this.prisma.volunteerProfile.create({
      data: {
        userId,
        skills: dto.skills,
        availability: dto.availability,
        experience: dto.experience,
        occupation: dto.occupation,
        organization: dto.organization,
        isVerified: dto.isVerified ?? false,
      },
    });
  }

  async getProfile(userId: string) {
    const profile =
      await this.prisma.volunteerProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!profile) {
      throw new NotFoundException(
        'Volunteer profile not found',
      );
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateVolunteerProfileDto,
  ) {
    return this.prisma.volunteerProfile.update({
      where: {
        userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
