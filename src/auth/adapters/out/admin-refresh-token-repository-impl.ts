import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AdminRefreshTokenInfo } from 'src/auth/domain/models/admin-refresh-token-info';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class AdminRefreshTokenRepositoryImpl implements AdminRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {
    setInterval(() => this.clearExpiredRefreshTokens(), 5*1000);
  }

  async save(refreshTokenInfo: AdminRefreshTokenInfo): Promise<void> {
    await this.prisma.adminRefreshToken.upsert({
      where: {
        adminId_refreshToken: {
          adminId: refreshTokenInfo.adminId,
          refreshToken: refreshTokenInfo.refreshToken,
        },
      },
      update: {},
      create: {
        adminId: refreshTokenInfo.adminId,
        refreshToken: refreshTokenInfo.refreshToken,
        expiresAt: refreshTokenInfo.expiresAt,
      },
    });
  }

  async isExists(adminId: string, refreshToken: string): Promise<boolean> {
    const result = await this.prisma.adminRefreshToken.findUnique({
      where: {
        adminId_refreshToken: {
          adminId,
          refreshToken,
        },
      },
    });

    return !!result;
  }

  async deleteByRefreshToken(adminId: string, refreshToken: string): Promise<void> {
    try {
      await this.prisma.adminRefreshToken.delete({
        where: {
          adminId_refreshToken: {
            adminId,
            refreshToken,
          },
        },
      });
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return;
        }
      }

      throw err;
    }
  }

  async deleteAll(adminId: string): Promise<void> {
    await this.prisma.adminRefreshToken.deleteMany({
      where: {
        adminId,
      },
    });
  }

  private clearExpiredRefreshTokens() {
    this.prisma.adminRefreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    }).then(() => {});
  }
}