import { AdminRepository } from '../../ports/out/admin-repository';
interface AdminInfo {
    id: string;
    name: string;
    joinedAt: Date;
}
export declare class SearchAdminsService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(page: number, size: number): Promise<AdminInfo[]>;
}
export {};
