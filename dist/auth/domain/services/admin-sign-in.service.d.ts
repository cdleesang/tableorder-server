import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { CredentialVerificationService } from '../../../admin/domain/services/credential-verification.service';
import { AdminAuthorityRepository } from '../../ports/out/admin-authority-repository';
import { TokenService } from './token.service';
interface Response {
    accessToken: string;
    refreshToken: string;
}
export declare class AdminSignInService {
    private readonly adminAuthorityRepository;
    private readonly adminRefreshTokenRepository;
    private readonly credentialVerificationService;
    private readonly tokenService;
    constructor(adminAuthorityRepository: AdminAuthorityRepository, adminRefreshTokenRepository: AdminRefreshTokenRepository, credentialVerificationService: CredentialVerificationService, tokenService: TokenService);
    execute(signInId: string, password: string): Promise<Response>;
}
export {};
