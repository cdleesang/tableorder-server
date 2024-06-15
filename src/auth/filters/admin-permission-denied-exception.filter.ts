import { ArgumentsHost, Catch, ForbiddenException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminPermissionDeniedError } from '../domain/errors/admin-permission-denied.error';

@Catch(AdminPermissionDeniedError)
export class AdminPermissionDeniedExceptionFilter extends BaseExceptionFilter {
  catch(_: any, host: ArgumentsHost) {
    super.catch(new ForbiddenException('Permission denied'), host);
  }
}