import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, UnauthorizedException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidRefreshTokenError } from 'src/auth/domain/errors/invalid-refresh-token-error';

@Catch(InvalidRefreshTokenError)
class AdminSignOutExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof InvalidRefreshTokenError) {
      super.catch(new UnauthorizedException(), host);
    }

    super.catch(exception, host);
  }
}

export const UseAdminSignOutExceptionFilter = () => applyDecorators(
  UseFilters(AdminSignOutExceptionFilter),
  TypedException<UnauthorizedException>(401, '유효하지 않은 토큰'),
);