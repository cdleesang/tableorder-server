import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found.error';

@Catch(AdminNotFoundError)
export class ViewOwnProfileExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof AdminNotFoundError) {
      super.catch(new NotFoundException('Admin not found'), host);
      return;
    }
      
    super.catch(exception, host);
  }
}