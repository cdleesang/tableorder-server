import { Catch, ForbiddenException } from '@nestjs/common';
import { AdminPermissionDeniedError } from 'src/admin/domain/errors/admin-permission-denied.error';

@Catch(AdminPermissionDeniedError)
export class DeleteExceptionFilter {
  catch(exception: any) {
    if(exception instanceof AdminPermissionDeniedError) {
      throw new ForbiddenException('Admin permission denied');
    }
      
    throw exception;
  }
}