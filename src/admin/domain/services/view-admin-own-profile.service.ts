import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminRepository } from '../../ports/out/admin-repository.port';
import { AdminNotFoundError } from '../errors/admin-not-found.error';

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

  async execute(adminAuthorization: AdminAuthorization): Promise<Response> {
    const admin = await this.adminRepository.findById(adminAuthorization.adminId);

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