import type { AdminAuthority } from '../../domain/models/admin-authority';

export interface AdminAuthorityRepository {
  findByAdminId(adminId: string): Promise<AdminAuthority | null>;
  save(authority: AdminAuthority): Promise<void>;
}

export const AdminAuthorityRepository = Symbol('AdminAuthorityRepository');