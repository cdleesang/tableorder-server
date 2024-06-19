import { TypedException } from '@nestia/core';
import { ArgumentsHost, Catch, UnauthorizedException, UseFilters, applyDecorators } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { SignInFailedError } from 'src/auth/domain/errors/sign-in-failed-error';

@Catch(SignInFailedError)
class AdminSignInExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof SignInFailedError) {
      super.catch(new UnauthorizedException('Sign in failed'), host);
      return;
    }

    super.catch(exception, host);
  }
}

export const UseAdminSignInExceptionFilter = () => applyDecorators(
  UseFilters(AdminSignInExceptionFilter),
  TypedException<UnauthorizedException>(401, '로그인 실패'),
);