import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { SignedAdminRequest } from '../types/signed-admin-request';

export const CurrentAdmin = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<SignedAdminRequest>();
    
    return request.admin;
  },
);