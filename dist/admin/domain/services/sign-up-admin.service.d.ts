import { AdminRepository } from '../../ports/out/admin-repository';
export declare class SignUpAdminService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(signInId: string, password: string, name: string): Promise<void>;
}
