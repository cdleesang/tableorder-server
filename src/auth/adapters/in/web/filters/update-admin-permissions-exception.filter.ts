import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, ConflictException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { SelfPermissionChangeNotAllowedError } from 'src/auth/domain/errors/self-permission-change-not-allowed-error';

@Catch(SelfPermissionChangeNotAllowedError)
class UpdateAdminPermissionsExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof SelfPermissionChangeNotAllowedError) {
      super.catch(new ConflictException('Self permission change not allowed'), host);
      return;
    }

    super.catch(exception, host);
  }
}

export const UseUpdateAdminPermissionsExceptionFilter = () => applyDecorators(
  UseFilters(UpdateAdminPermissionsExceptionFilter),
  TypedException<ConflictException>(409, '본인 권한 변경 불가'),
);