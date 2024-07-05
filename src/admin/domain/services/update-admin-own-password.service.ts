import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminRepository } from '../../ports/out/admin-repository';
import { AdminNotFoundError } from '../errors/admin-not-found-error';
import { IncorrectPasswordError } from '../errors/incorrect-password-error';

@Injectable()
export class UpdateAdminOwnPasswordService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(authority: AdminAuthority, currentPassword: string, newPassword: string): Promise<void> {
    const admin = await this.adminRepository.findById(authority.adminId);

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