import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import type { AdminAuthorityRepository } from 'src/auth/ports/out/admin-authority-repository';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
export declare class AdminAuthorityRepositoryImpl implements AdminAuthorityRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByAdminId(adminId: string): Promise<AdminAuthority | null>;
    save(authority: AdminAuthority): Promise<void>;
}
