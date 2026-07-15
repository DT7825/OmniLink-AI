import { UserRole, UserStatus } from "@prisma/client";
export class UserEntity {
  id!: string;

  fullName!: string;

  email?: string;

  phone?: string;

  profileImage?: string;

  bio?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  pincode?: string;

  latitude?: number;

  longitude?: number;

  role!: string;

  status!: string;

  isVerified!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
}
