import { AdminRefreshTokenInfo } from 'src/auth/domain/models/admin-refresh-token-info';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
export declare class AdminRefreshTokenRepositoryImpl implements AdminRefreshTokenRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(refreshTokenInfo: AdminRefreshTokenInfo): Promise<void>;
    isExists(adminId: string, refreshToken: string): Promise<boolean>;
    deleteByRefreshToken(adminId: string, refreshToken: string): Promise<void>;
    deleteAll(adminId: string): Promise<void>;
    private clearExpiredRefreshTokens;
}
