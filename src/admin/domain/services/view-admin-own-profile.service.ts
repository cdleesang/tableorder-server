import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminRepository } from '../../ports/out/admin-repository';
import { AdminNotFoundError } from '../errors/admin-not-found-error';

interface Response {
  id: string;
  signInId: string;
  name: string;
  joinedAt: Date;
}

@Injectable()
export class ViewAdminOwnProfileService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(authority: AdminAuthority): Promise<Response> {
    const admin = await this.adminRepository.findById(authority.adminId);

    if(!admin) {
      throw new AdminNotFoundError();
    }

    return {
      id: admin.id,
      signInId: admin.signInId,
      name: admin.name,
      joinedAt: admin.joinedAt,
    };
  }
}