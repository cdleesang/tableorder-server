import { AdminAuthorityRepository } from 'src/auth/ports/out/admin-authority-repository';
import { AdminPermission } from '../models/admin-permission';
export declare class ViewAdminPermissionsService {
    private readonly adminAuthorityRepository;
    constructor(adminAuthorityRepository: AdminAuthorityRepository);
    execute(adminId: string): Promise<AdminPermission[]>;
}
