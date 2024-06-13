import { Catch, NotFoundException } from '@nestjs/common';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found.error';

@Catch(AdminNotFoundError)
export class ViewOwnProfileExceptionFilter {
  catch(exception: any) {
    if(exception instanceof AdminNotFoundError) {
      throw new NotFoundException('Admin not found');
    }
      
    throw exception;
  }
}