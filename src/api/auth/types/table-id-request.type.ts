// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';

export type TableIdRequest = Request & { tableId: number };