import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthPayload } from 'src/interfaces/auth';

@Injectable()
export class AuthRepository {
  constructor(private readonly jwtService: JwtService) {}

  async comparePassword(hashedPassword: string, plainPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(payload: AuthPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
