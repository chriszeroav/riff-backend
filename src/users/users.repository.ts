import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          password: true,
          role: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        data: null,
        success: false,
        error: 'Error interno del servidor',
      });
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, created_at: true },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException({
        data: null,
        success: false,
        error: 'Error interno del servidor',
      });
    }
  }

  async findAllUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        select: { id: true, name: true, email: true, created_at: true },
      });

      return users;
    } catch (error) {
      throw new InternalServerErrorException({
        data: null,
        success: false,
        error: 'Error interno del servidor',
      });
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prismaService.user.create({
        data: { ...data, password: hashedPassword },
        select: { id: true, name: true, email: true, created_at: true },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException({
        data: null,
        success: false,
        error: 'Error al crear el usuario',
      });
    }
  }
}
