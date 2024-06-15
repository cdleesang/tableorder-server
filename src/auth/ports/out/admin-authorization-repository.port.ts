import type { AdminAuthorization } from '../../domain/models/admin-authorization.model';

export interface AdminAuthorizationRepository {
  findByAdminId(adminId: string): Promise<AdminAuthorization | null>;
  save(authorization: AdminAuthorization): Promise<void>;
}

export const AdminAuthorizationRepository = Symbol('AdminAuthorizationRepository');