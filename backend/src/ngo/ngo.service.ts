import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateNgoProfileDto } from './dto/create-ngo-profile.dto';
import { UpdateNgoProfileDto } from './dto/update-ngo-profile.dto';

@Injectable()
export class NgoService {
  constructor(private prisma: PrismaService) {}

  async createProfile(
    userId: string,
    dto: CreateNgoProfileDto,
  ) {
    return this.prisma.nGOProfile.create({
      data: {
        userId,
        ngoName: dto.ngoName,
        registrationNo: dto.registrationNo,
        website: dto.website,
        description: dto.description,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        pinCode: dto.pinCode,
        isVerified: dto.isVerified ?? false,
      },
    });
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.nGOProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException('NGO profile not found');
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateNgoProfileDto,
  ) {
    return this.prisma.nGOProfile.update({
      where: {
        userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
