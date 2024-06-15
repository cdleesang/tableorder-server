import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminAlreadyExistsError } from 'src/admin/domain/errors/admin-already-exists.error';

@Catch(AdminAlreadyExistsError)
export class SignUpExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof AdminAlreadyExistsError) {
      super.catch(new ConflictException('Admin already exists'), host);
      return;
    }
      
    super.catch(exception, host);
  }
}