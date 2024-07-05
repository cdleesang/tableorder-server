import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminRepository } from '../../ports/out/admin-repository';
import { AdminNotFoundError } from '../errors/admin-not-found-error';

@Injectable()
export class UpdateAdminOwnProfileService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(authority: AdminAuthority, profile: {name: string}): Promise<void> {
    const admin = await this.adminRepository.findById(authority.adminId);

    if(!admin) {
      throw new AdminNotFoundError();
    }

    admin.name = profile.name;

    await this.adminRepository.save(admin);
  }
}