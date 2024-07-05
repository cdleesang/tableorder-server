import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { AdminAuthority } from '../models/admin-authority';
import { TokenService } from './token.service';
export declare class AdminSignOutService {
    private readonly adminRefreshTokenRepository;
    private readonly tokenService;
    constructor(adminRefreshTokenRepository: AdminRefreshTokenRepository, tokenService: TokenService);
    execute(authority: AdminAuthority, refreshToken: string): Promise<void>;
}
