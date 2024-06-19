import { Inject, Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/out/admin-repository';
import { AdminAlreadyExistsError } from '../errors/admin-already-exists-error';
import { Admin } from '../models/admin';

@Injectable()
export class SignUpAdminService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(signInId: string, password: string, name: string): Promise<void> {
    const id = Admin.generateId();

    const existingAdmin = await this.adminRepository.findBySignInId(signInId);

    if(existingAdmin) {
      throw new AdminAlreadyExistsError();
    }

    const admin = new Admin(id, signInId, '', name);
    admin.setPassword(password);
    
    await this.adminRepository.save(admin);
  }
}