import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAllUsers() {
    const users = await this.usersRepository.findAllUsers();

    return {
      data: users,
      success: true,
      error: null,
    };
  }

  async findUser(id: string) {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException({
        data: null,
        success: false,
        error: 'Usuario no encontrado',
      });
    }
    return user;
  }
}
