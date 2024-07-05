import type { Request } from 'express';
import type { AdminAccessTokenPayload } from 'src/auth/domain/models/admin-token-payload';
export type SignedAdminRequest = Request & {
    admin: AdminAccessTokenPayload;
};
