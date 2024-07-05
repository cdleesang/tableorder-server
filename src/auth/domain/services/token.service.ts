import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../../config/config.service';
import { AdminAuthority } from '../models/admin-authority';
import type { AdminAccessTokenPayload, AdminRefreshTokenPayload } from '../models/admin-token-payload';
import { TableAccessTokenPayload } from '../models/table-token-payload';
import { Table } from '../models/table';
import { AdminRefreshTokenInfo } from '../models/admin-refresh-token-info';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async issueTableAccessToken(table: Table): Promise<string> {
    const payload: TableAccessTokenPayload = {
      tableId: table.id,
      tableName: table.name,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('TABLE_JWT_SECRET'),
      audience: 'table',
    });
  }

  checkTableAccessToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('TABLE_JWT_SECRET'),
        audience: 'table',
      });
      return true;
    } catch{
      return false;
    }
  }

  decodeTableAccessToken(token: string): TableAccessTokenPayload {
    return this.jwtService.decode<TableAccessTokenPayload>(token);
  }

  issueAdminAccessToken(authority: AdminAuthority): string {
    const payload: AdminAccessTokenPayload = {
      adminId: authority.adminId,
      permissions: authority.permissions,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('ADMIN_JWT_SECRET'),
      audience: 'admin_access',
      expiresIn: '5m',
    });
  }

  checkAdminAccessToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('ADMIN_JWT_SECRET'),
        audience: 'admin_access',
      });
      return true;
    } catch{
      return false;
    }
  }

  decodeAdminAccessToken(token: string): AdminAuthority {
    const payload = this.jwtService.decode<AdminAccessTokenPayload>(token);

    return new AdminAuthority(payload.adminId, payload.permissions);
  }

  issueAdminRefreshToken(authority: AdminAuthority): AdminRefreshTokenInfo {
    const payload: AdminRefreshTokenPayload = {
      adminId: authority.adminId,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ADMIN_REFRESH_JWT_SECRET'),
      audience: 'admin_refresh',
      expiresIn: '30d',
    });
    const { exp } = this.decodeAdminRefreshToken(refreshToken);

    return new AdminRefreshTokenInfo(authority.adminId, refreshToken, new Date(exp! * 1000));
  }

  checkAdminRefreshToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('ADMIN_REFRESH_JWT_SECRET'),
        audience: 'admin_refresh',
      });
      return true;
    } catch{
      return false;
    }
  }

  decodeAdminRefreshToken(token: string): AdminRefreshTokenPayload {
    return this.jwtService.decode<AdminRefreshTokenPayload>(token);
  }
}