import {
  Injectable,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
  where: {
    email: createUserDto.email,
  },
});

if (existingUser) {
  throw new ConflictException(
    'A user with this email already exists.',
  );
}
const hashedPassword = await bcrypt.hash(
  createUserDto.password,
  10,
);
const user = await this.prisma.user.create({
  data: {
    fullName: createUserDto.fullName,
    email: createUserDto.email,
    passwordHash: hashedPassword,

    phone: createUserDto.phone,
    profileImage: createUserDto.profileImage,
    bio: createUserDto.bio,

    address: createUserDto.address,
    city: createUserDto.city,
    state: createUserDto.state,
    country: createUserDto.country,
    pincode: createUserDto.pincode,

    latitude: createUserDto.latitude,
    longitude: createUserDto.longitude,

    
  },
});

const { passwordHash, ...safeUser } = user;

return safeUser;
}
}
