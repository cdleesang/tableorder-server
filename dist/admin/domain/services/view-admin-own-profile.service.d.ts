import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminRepository } from '../../ports/out/admin-repository';
interface Response {
    id: string;
    signInId: string;
    name: string;
    joinedAt: Date;
}
export declare class ViewAdminOwnProfileService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(authority: AdminAuthority): Promise<Response>;
}
export {};
