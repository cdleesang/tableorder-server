import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminRepository } from '../../ports/out/admin-repository';
export declare class UpdateAdminOwnPasswordService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(authority: AdminAuthority, currentPassword: string, newPassword: string): Promise<void>;
}
