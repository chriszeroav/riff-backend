import { Request } from 'express';
import { Role } from '@prisma/client';

export interface AuthPayload {
  sub: string;
  email: string;
  role: Role;
}

export interface RequestWithUser extends Request {
  user: AuthPayload;
}
