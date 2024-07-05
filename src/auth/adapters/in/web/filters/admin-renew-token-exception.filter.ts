import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, UnauthorizedException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidRefreshTokenError } from 'src/auth/domain/errors/invalid-refresh-token-error';

@Catch(InvalidRefreshTokenError)
class AdminRenewTokenExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if(exception instanceof InvalidRefreshTokenError) {
      super.catch(new UnauthorizedException('Invalid refresh token'), host);
      return;
    }

    super.catch(exception, host);
  }
}

export const UseAdminRenewTokenExceptionFilter = () => applyDecorators(
  UseFilters(AdminRenewTokenExceptionFilter),
  TypedException<UnauthorizedException>(401, 'Invalid refresh token'),
);