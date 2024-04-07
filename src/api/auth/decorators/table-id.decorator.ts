import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TableIdRequest } from '../types/table-id-request.type';

export const TableId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<TableIdRequest>();

  return request.tableId;
})