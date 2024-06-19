import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, ConflictException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AdminAlreadyExistsError } from 'src/admin/domain/errors/admin-already-exists-error';

@Catch(AdminAlreadyExistsError)
class SignUpExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof AdminAlreadyExistsError) {
      super.catch(new ConflictException('Admin already exists'), host);
      return;
    }
      
    super.catch(exception, host);
  }
}

export const UseSignUpExceptionFilter = () => applyDecorators(
  UseFilters(SignUpExceptionFilter),
  TypedException<ConflictException>(409, '이미 존재하는 아이디'),
);