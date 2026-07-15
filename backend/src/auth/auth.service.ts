import * as bcrypt from 'bcrypt';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        fullName: registerDto.fullName,
        email: registerDto.email,
        passwordHash: hashedPassword,
        phone: registerDto.phone,
        role: registerDto.role,
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  async login(loginDto: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: loginDto.email,
    },
  });

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const passwordMatched = await bcrypt.compare(
    loginDto.password,
    user.passwordHash,
  );

  if (!passwordMatched) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = await this.jwtService.signAsync(payload);

  return {
    message: 'Login successful',
    accessToken,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
}
}
