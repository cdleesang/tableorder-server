import { Catch, ConflictException, NotFoundException, type ExceptionFilter } from '@nestjs/common';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found.error';
import { IncorrectPasswordError } from 'src/admin/domain/errors/incorrect-password.error';

@Catch(AdminNotFoundError, IncorrectPasswordError)
export class UpdateOwnPasswordExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    if(exception instanceof AdminNotFoundError) {
      throw new NotFoundException('Admin not found');
    }

    if(exception instanceof IncorrectPasswordError) {
      throw new ConflictException('Incorrect password');
    }

    throw exception;
  }
}