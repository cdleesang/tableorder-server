import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../../config/config.service';
import { AdminAuthority } from '../models/admin-authority';
import type { AdminRefreshTokenPayload } from '../models/admin-token-payload';
import { TableAccessTokenPayload } from '../models/table-token-payload';
import { Table } from '../models/table';
import { AdminRefreshTokenInfo } from '../models/admin-refresh-token-info';
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    issueTableAccessToken(table: Table): Promise<string>;
    checkTableAccessToken(token: string): boolean;
    decodeTableAccessToken(token: string): TableAccessTokenPayload;
    issueAdminAccessToken(authority: AdminAuthority): string;
    checkAdminAccessToken(token: string): boolean;
    decodeAdminAccessToken(token: string): AdminAuthority;
    issueAdminRefreshToken(authority: AdminAuthority): AdminRefreshTokenInfo;
    checkAdminRefreshToken(token: string): boolean;
    decodeAdminRefreshToken(token: string): AdminRefreshTokenPayload;
}
