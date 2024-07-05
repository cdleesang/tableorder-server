import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import { TokenService } from '../../domain/services';
export declare class AdminGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): boolean;
    private extractTokenFromHeader;
}
