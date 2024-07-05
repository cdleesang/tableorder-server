import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { AdminAuthority } from '../models/admin-authority';
export declare class AdminSignOutAllService {
    private readonly adminRefreshTokenRepository;
    constructor(adminRefreshTokenRepository: AdminRefreshTokenRepository);
    execute(authority: AdminAuthority): Promise<void>;
}
