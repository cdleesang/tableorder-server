import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminRepository } from '../../ports/out/admin-repository.port';
import { AdminNotFoundError } from '../errors/admin-not-found.error';
import { IncorrectPasswordError } from '../errors/incorrect-password.error';

@Injectable()
export class UpdateAdminOwnPasswordService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(adminAuthorization: AdminAuthorization, currentPassword: string, newPassword: string): Promise<void> {
    const admin = await this.adminRepository.findById(adminAuthorization.adminId);

    if(!admin) {
      throw new AdminNotFoundError();
    }

    if(!admin.validatePassword(currentPassword)) {
      throw new IncorrectPasswordError();
    }

    admin.setPassword(newPassword);

    await this.adminRepository.save(admin);
  }
}