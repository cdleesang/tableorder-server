import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { CanAdminAccessService } from 'src/auth/domain/services/can-admin-access.service';
import { AdminRepository } from '../../ports/out/admin-repository';
export declare class DeleteAdminService {
    private readonly adminRepository;
    private readonly canAdminAccessService;
    constructor(adminRepository: AdminRepository, canAdminAccessService: CanAdminAccessService);
    execute(authority: AdminAuthority, targetId: string): Promise<void>;
}
