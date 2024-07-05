import { AdminRepository } from '../../ports/out/admin-repository';
export declare class CredentialVerificationService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(signInId: string, password: string): Promise<{
        id: string;
    } | false>;
}
