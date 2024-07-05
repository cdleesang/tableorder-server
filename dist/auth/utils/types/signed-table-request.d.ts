import type { Request } from 'express';
import { TableAccessTokenPayload } from 'src/auth/domain/models/table-token-payload';
export type SignedTableRequest = Request & {
    table: TableAccessTokenPayload;
};
