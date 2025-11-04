import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { type RequestWithUser } from 'src/interfaces/auth';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Req() req: RequestWithUser) {
    return this.usersService.findAllUsers();
  }
}
