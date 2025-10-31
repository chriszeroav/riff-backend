import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const userFound = await this.usersRepository.findUserByEmail(email);

    if (userFound) {
      throw new ConflictException({
        data: null,
        success: false,
        error: 'El correo electrónico ya está en uso',
      });
    }

    const user = await this.usersRepository.createUser(createUserDto);

    return {
      data: user,
      success: true,
      error: null,
    };
  }

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
