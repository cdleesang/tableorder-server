import { Inject, Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/out/admin-repository';

@Injectable()
export class CredentialVerificationService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(signInId: string, password: string): Promise<{id: string} | false> {
    const admin = await this.adminRepository.findBySignInId(signInId);

    if(!admin || !admin.validatePassword(password)) {
      return false;
    }

    return {id: admin.id};
  }
}