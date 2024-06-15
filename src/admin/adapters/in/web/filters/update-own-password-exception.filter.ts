import { ArgumentsHost, Catch, ConflictException, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found.error';
import { IncorrectPasswordError } from 'src/admin/domain/errors/incorrect-password.error';

@Catch(AdminNotFoundError, IncorrectPasswordError)
export class UpdateOwnPasswordExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof AdminNotFoundError) {
      super.catch(new NotFoundException('Admin not found'), host);
      return;
    }

    if(exception instanceof IncorrectPasswordError) {
      super.catch(new ConflictException('Incorrect password'), host);
      return;
    }

    super.catch(exception, host);
  }
}