import type { Request } from 'express';
import type { AdminAuthorization } from '../domain/models/admin-authorization.model';

export type SignedAdminRequest = Request & {
  admin: AdminAuthorization;
};