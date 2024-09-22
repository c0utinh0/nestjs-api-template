import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    await this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  async findMe(id: string): Promise<UserResponseDto> {
    const user = this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
    return user;
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async findOneAuth(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const partialUser = { ...user };
    delete partialUser.createdAt;
    delete partialUser.updatedAt;
    delete partialUser.password;

    return partialUser;
  }
}
