import { Inject, Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/admin/ports/out/admin-repository.port';

@Injectable()
export class IsAdminActiveService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(adminId: string): Promise<boolean> {
    const admin = await this.adminRepository.findById(adminId);

    return !!admin;
  }
}