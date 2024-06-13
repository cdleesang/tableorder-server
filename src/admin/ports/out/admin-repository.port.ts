import { Admin } from '../../domain/models/admin.model';

export interface AdminRepository {
  save(admin: Admin): Promise<void>;
  findAll(options: {
    page?: number;
    limit?: number;
    order?: 'newest';
  }): Promise<Admin[]>;
  findById(id: string): Promise<Admin | null>;
  findBySignInId(signInId: string): Promise<Admin | null>;
  deleteById(id: string): Promise<void>;
}

export const AdminRepository = Symbol('ADMIN_REPOSITORY');