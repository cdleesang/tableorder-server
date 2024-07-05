import { AdminRefreshTokenInfo } from 'src/auth/domain/models/admin-refresh-token-info';

export interface AdminRefreshTokenRepository {
  save(refreshTokenInfo: AdminRefreshTokenInfo): Promise<void>;
  isExists(adminId: string, refreshToken: string): Promise<boolean>;
  deleteByRefreshToken(adminId: string, refreshToken: string): Promise<void>;
  deleteAll(adminId: string): Promise<void>;
}

export const AdminRefreshTokenRepository = Symbol('AdminRefreshTokenRepository');