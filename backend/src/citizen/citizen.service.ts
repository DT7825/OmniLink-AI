import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateCitizenProfileDto } from './dto/create-citizen-profile.dto';
import { UpdateCitizenProfileDto } from './dto/update-citizen-profile.dto';

@Injectable()
export class CitizenService {
  constructor(private prisma: PrismaService) {}

  async createProfile(
    userId: string,
    dto: CreateCitizenProfileDto,
  ) {
    return this.prisma.citizenProfile.create({
      data: {
        userId,

        gender: dto.gender,

        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined,

        bloodGroup: dto.bloodGroup,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        pinCode: dto.pinCode,
        emergencyContact: dto.emergencyContact,
      },
    });
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.citizenProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException(
        'Citizen profile not found',
      );
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateCitizenProfileDto,
  ) {
    return this.prisma.citizenProfile.update({
      where: {
        userId,
      },
      data: {
        ...dto,

        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined,
      },
    });
  }
}



