import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/auth/domain/services';
import type { Request } from 'express';
import { SignedTableRequest } from '../types/signed-table-request';

@Injectable()
export class TableGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<SignedTableRequest>();
    const token = this.extractTokenFromHeader(request);

    if(!token) {
      throw new UnauthorizedException();
    }

    try {
      this.tokenService.checkTableAccessToken(token);
    } catch{
      throw new UnauthorizedException();
    }

    const payload = this.tokenService.decodeTableAccessToken(token);
    request.table = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    
    return type === 'Bearer' ? token : undefined;
  }
}