import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminRepository } from '../../ports/out/admin-repository.port';
import { AdminNotFoundError } from '../errors/admin-not-found.error';

@Injectable()
export class UpdateAdminOwnProfileService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(adminAuthorization: AdminAuthorization, profile: {name: string}): Promise<void> {
    const admin = await this.adminRepository.findById(adminAuthorization.adminId);

    if(!admin) {
      throw new AdminNotFoundError();
    }

    admin.name = profile.name;

    await this.adminRepository.save(admin);
  }
}