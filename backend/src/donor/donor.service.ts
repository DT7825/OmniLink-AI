import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateDonorProfileDto } from './dto/create-donor-profile.dto';
import { UpdateDonorProfileDto } from './dto/update-donor-profile.dto';

@Injectable()
export class DonorService {
  constructor(private prisma: PrismaService) {}

  async createProfile(
    userId: string,
    dto: CreateDonorProfileDto,
  ) {
    return this.prisma.donorProfile.create({
      data: {
        userId,
        bloodGroup: dto.bloodGroup,
        isAvailable: dto.isAvailable ?? true,
        lastDonationDate: dto.lastDonationDate
          ? new Date(dto.lastDonationDate)
          : null,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        pinCode: dto.pinCode,
      },
    });
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.donorProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException('Donor profile not found');
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateDonorProfileDto,
  ) {
    return this.prisma.donorProfile.update({
      where: {
        userId,
      },
      data: {
        ...dto,
        lastDonationDate: dto.lastDonationDate
          ? new Date(dto.lastDonationDate)
          : undefined,
      },
    });
  }
}
