import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, NotFoundException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found-error';

@Catch(AdminNotFoundError)
class UpdateOwnProfileExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof AdminNotFoundError) {
      super.catch(new NotFoundException('Admin not found'), host);
      return;
    }
      
    super.catch(exception, host);
  }
}

export const UseUpdateOwnProfileExceptionFilter = () => applyDecorators(
  UseFilters(UpdateOwnProfileExceptionFilter),
  TypedException<NotFoundException>(404, '관리자를 찾을 수 없음'),
);