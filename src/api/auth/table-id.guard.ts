import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TableIdRequest } from './types/table-id-request.type';

@Injectable()
export class TableIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const tableId = request.headers.tid as string;

    if(!(tableId && parseInt(tableId, 10) > 0)) {
      return false;
    }

    (request as TableIdRequest).tableId = parseInt(tableId, 10);

    return true;
  }
}