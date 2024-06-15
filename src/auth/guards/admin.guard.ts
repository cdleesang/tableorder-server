import { Injectable, UnauthorizedException, type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { TokenService } from '../domain/services';
import type { SignedAdminRequest } from '../types/signed-admin-request.type';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<SignedAdminRequest>();
    const token = this.extractTokenFromHeader(request);

    if(!token) {
      throw new UnauthorizedException();
    }

    try {
      this.tokenService.checkAdminToken(token);
    } catch{
      throw new UnauthorizedException();
    }

    const payload = this.tokenService.decodeAdminToken(token);
    request.admin = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    
    return type === 'Bearer' ? token : undefined;
  }
}