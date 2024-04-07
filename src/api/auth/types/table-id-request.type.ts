import { Request } from 'express';

export type TableIdRequest = Request & { tableId: number };