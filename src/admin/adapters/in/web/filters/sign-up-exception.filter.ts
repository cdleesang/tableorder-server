import { Catch, ConflictException, type ExceptionFilter } from '@nestjs/common';
import { AdminAlreadyExistsError } from 'src/admin/domain/errors/admin-already-exists.error';

@Catch(AdminAlreadyExistsError)
export class SignUpExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    if(exception instanceof AdminAlreadyExistsError) {
      throw new ConflictException('Admin already exists');
    }
      
    throw exception;
  }
}