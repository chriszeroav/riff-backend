import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async login({ email, password }: LoginDto) {
    const userFound = await this.usersRepository.findUserByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException({
        data: null,
        success: false,
        error: 'Credenciales inválidas',
      });
    }

    const isPasswordValid = await this.authRepository.comparePassword(
      userFound.password,
      password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        data: null,
        success: false,
        error: 'Credenciales inválidas',
      });
    }

    const token = await this.authRepository.generateToken({
      sub: userFound.id,
      email: userFound.email,
      role: userFound.role,
    });

    return {
      data: { token },
      success: true,
      error: null,
    };
  }

  async register({ name, email, password }: RegisterDto) {
    const userFound = await this.usersRepository.findUserByEmail(email);

    if (userFound) {
      throw new ConflictException({
        data: null,
        success: false,
        error: 'El correo electrónico ya está en uso',
      });
    }

    const user = await this.usersRepository.createUser({
      name,
      email,
      password,
    });

    return {
      data: user,
      success: true,
      error: null,
    };
  }
}
