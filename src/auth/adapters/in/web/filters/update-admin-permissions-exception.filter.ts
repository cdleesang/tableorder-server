import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { SelfPermissionChangeNotAllowedError } from 'src/auth/domain/errors/self-permission-change-not-allowed.error';

@Catch(SelfPermissionChangeNotAllowedError)
export class UpdateAdminPermissionsExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof SelfPermissionChangeNotAllowedError) {
      super.catch(new ConflictException('Self permission change not allowed'), host);
      return;
    }

    super.catch(exception, host);
  }
}