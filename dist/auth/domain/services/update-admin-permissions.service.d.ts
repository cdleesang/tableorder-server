import { AdminAuthorityRepository } from '../../ports/out/admin-authority-repository';
import { AdminAuthority } from '../models/admin-authority';
import { AdminPermission } from '../models/admin-permission';
export declare class UpdateAdminPermissionsService {
    private readonly adminAuthorityRepository;
    constructor(adminAuthorityRepository: AdminAuthorityRepository);
    execute(authority: AdminAuthority, targetId: string, newPermissions: AdminPermission[]): Promise<void>;
}
