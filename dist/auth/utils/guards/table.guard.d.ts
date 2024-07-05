import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from 'src/auth/domain/services';
export declare class TableGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): boolean;
    private extractTokenFromHeader;
}
