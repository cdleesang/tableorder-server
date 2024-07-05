import { Injectable } from '@nestjs/common';
import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminPermission } from 'src/auth/domain/models/admin-permission';
import type { AdminAuthorityRepository } from 'src/auth/ports/out/admin-authority-repository';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class AdminAuthorityRepositoryImpl implements AdminAuthorityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByAdminId(adminId: string): Promise<AdminAuthority | null> {
    const adminPermissions = await this.prisma.adminPermission.findMany({
      where: {
        adminId,
      },
    });

    return new AdminAuthority(adminId, adminPermissions.map(p => p.permission as AdminPermission));
  }
  
  async save(authority: AdminAuthority): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.adminPermission.deleteMany({
        where: {
          adminId: authority.adminId,
        },
      }),
      this.prisma.adminPermission.createMany({
        data: authority.permissions.map(p => ({
          adminId: authority.adminId,
          permission: p,
        })),
      }),
    ]);
  }
}