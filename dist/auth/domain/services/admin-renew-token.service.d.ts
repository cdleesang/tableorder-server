import { AdminAuthorityRepository } from 'src/auth/ports/out/admin-authority-repository';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { TokenService } from './token.service';
interface Response {
    accessToken: string;
    refreshToken: string;
}
export declare class AdminRenewTokenService {
    private readonly adminAuthorityRepository;
    private readonly adminRefreshTokenRepository;
    private readonly tokenService;
    constructor(adminAuthorityRepository: AdminAuthorityRepository, adminRefreshTokenRepository: AdminRefreshTokenRepository, tokenService: TokenService);
    execute(currentRefreshToken: string): Promise<Response>;
}
export {};
