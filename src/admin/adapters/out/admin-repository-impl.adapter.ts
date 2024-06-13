import { Injectable } from '@nestjs/common';
import type { Prisma, Admin as PrismaAdmin } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { Admin } from '../../domain/models/admin.model';
import { AdminRepository } from '../../ports/out/admin-repository.port';

@Injectable()
export class AdminRepositoryImpl implements AdminRepository {
  constructor(
    private prismaService: PrismaService,
  ) {
    console.log(prismaService)
  }

  async save(admin: Admin): Promise<void> {
    await this.prismaService.admin.upsert({
      where: { id: admin.id },
      create: {
        id: admin.id,
        signInId: admin.signInId,
        password: admin.hashedPassword,
        name: admin.name,
      },
      update: {
        password: admin.hashedPassword,
        name: admin.name,
      },
    });
  }

  async findAll(options: {
    page?: number;
    limit?: number;
    order?: 'newest';
  }): Promise<Admin[]> {
    const orderBy: Prisma.AdminOrderByWithRelationInput[] = options.order === 'newest' ? [{ createdAt: 'desc' }] : [];

    const results = await this.prismaService.admin.findMany({
      skip: options.page ? (options.page - 1) * (options.limit ?? 0) : 0,
      take: options.limit,
      orderBy,
    });

    return results.map(this.mapToDomainModel);
  }

  async findBySignInId(signInId: string): Promise<Admin | null> {
    return this.findOne({where: { signInId }});
  }

  async findById(id: string): Promise<Admin | null> {
    return this.findOne({where: { id }});
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.admin.delete({
      where: { id },
    });
  }

  private async findOne(options: Prisma.AdminFindUniqueArgs): Promise<Admin | null> {
    const result = await this.prismaService.admin.findUnique(options);

    if(!result) {
      return null;
    }

    return this.mapToDomainModel(result);
  }

  private mapToDomainModel(prismaAdmin: PrismaAdmin): Admin {
    return new Admin(prismaAdmin.id, prismaAdmin.signInId, prismaAdmin.password, prismaAdmin.name, prismaAdmin.createdAt);
  }
}