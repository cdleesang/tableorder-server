import { Inject, Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/out/admin-repository.port';

interface AdminInfo {
  id: string;
  name: string;
  joinedAt: Date;
}

@Injectable()
export class SearchAdminsService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(page: number, size: number): Promise<AdminInfo[]> {
    const admins = await this.adminRepository.findAll({
      page,
      limit: size,
      order: 'oldest',
    });

    return admins.map(admin => ({
      id: admin.id,
      name: admin.name,
      joinedAt: admin.joinedAt,
    }));
  }
}