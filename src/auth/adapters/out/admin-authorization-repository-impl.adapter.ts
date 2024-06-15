import { Injectable } from '@nestjs/common';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminPermission } from 'src/auth/domain/models/admin-permission.enum';
import type { AdminAuthorizationRepository } from 'src/auth/ports/out/admin-authorization-repository.port';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class AdminAuthorizationRepositoryImpl implements AdminAuthorizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByAdminId(adminId: string): Promise<AdminAuthorization | null> {
    const adminPermissions = await this.prisma.adminPermission.findMany({
      where: {
        adminId,
      },
    });

    return new AdminAuthorization(adminId, adminPermissions.map(p => p.permission as AdminPermission));
  }
  
  async save(authorization: AdminAuthorization): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.adminPermission.deleteMany({
        where: {
          adminId: authorization.adminId,
        },
      }),
      this.prisma.adminPermission.createMany({
        data: authorization.permissions.map(p => ({
          adminId: authorization.adminId,
          permission: p,
        })),
      }),
    ]);
  }
}