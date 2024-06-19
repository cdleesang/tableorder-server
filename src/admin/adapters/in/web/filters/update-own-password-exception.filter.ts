import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, ConflictException, NotFoundException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found-error';
import { IncorrectPasswordError } from 'src/admin/domain/errors/incorrect-password-error';

@Catch(AdminNotFoundError, IncorrectPasswordError)
class UpdateOwnPasswordExceptionFilter extends BaseExceptionFilter {
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

export const UseUpdateOwnPasswordExceptionFilter = () => applyDecorators(
  UseFilters(UpdateOwnPasswordExceptionFilter),
  TypedException<NotFoundException>(404, '관리자를 찾을 수 없음'),
  TypedException<ConflictException>(409, '현재 비밀번호가 일치하지 않음'),
);