import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, NotFoundException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidParingCodeError } from 'src/auth/domain/errors/invalid-paring-code-error';

@Catch(InvalidParingCodeError)
class ParingTableExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof InvalidParingCodeError) {
      super.catch(new NotFoundException('Invalid paring code'), host);
      return;
    }
    
    super.catch(exception, host);
  }
}

export const UseParingTableExceptionFilter = () => applyDecorators(
  UseFilters(ParingTableExceptionFilter),
  TypedException<NotFoundException>(404, '일치하는 페어링코드를 찾을 수 없음'),
);