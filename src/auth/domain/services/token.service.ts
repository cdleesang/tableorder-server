import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../../config/config.service';
import { AdminAuthorization } from '../models/admin-authorization.model';
import type { AdminTokenPayload } from '../models/admin-token-payload.type';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  issueAdminToken(adminAuthorization: AdminAuthorization): string {
    const payload: AdminTokenPayload = {
      adminId: adminAuthorization.adminId,
      permissions: adminAuthorization.permissions,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      audience: 'admin',
      expiresIn: '30m',
    });
  }

  checkAdminToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
        audience: 'admin',
      });
      return true;
    } catch{
      return false;
    }
  }

  decodeAdminToken(token: string): AdminAuthorization {
    const payload = this.jwtService.decode<AdminTokenPayload>(token);

    return new AdminAuthorization(payload.adminId, payload.permissions);
  }
}