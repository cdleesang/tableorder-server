import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, ForbiddenException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminPermissionDeniedError } from '../../domain/errors/admin-permission-denied-error';

@Catch(AdminPermissionDeniedError)
class AdminPermissionDeniedExceptionFilter extends BaseExceptionFilter {
  catch(_: any, host: ArgumentsHost) {
    super.catch(new ForbiddenException('Permission denied'), host);
  }
}

export const UseAdminPermissionDeniedExceptionFilter = () => applyDecorators(
  UseFilters(AdminPermissionDeniedExceptionFilter),
  TypedException<ForbiddenException>(403, '권한 없음'),
);