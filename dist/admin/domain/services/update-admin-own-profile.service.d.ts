import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminRepository } from '../../ports/out/admin-repository';
export declare class UpdateAdminOwnProfileService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(authority: AdminAuthority, profile: {
        name: string;
    }): Promise<void>;
}
