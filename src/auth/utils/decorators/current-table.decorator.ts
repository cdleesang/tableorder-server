import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { SignedTableRequest } from '../types/signed-table-request';

export const CurrentTable = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<SignedTableRequest>();
    
    return request.table;
  },
);