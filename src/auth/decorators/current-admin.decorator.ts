import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { SignedAdminRequest } from '../types/signed-admin-request.type';

export const CurrentAdmin = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<SignedAdminRequest>();
    
    return request.admin;
  },
);