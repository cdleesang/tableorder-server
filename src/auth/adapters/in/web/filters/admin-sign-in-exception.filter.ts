import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { SignInFailedError } from 'src/auth/domain/errors/sign-in-failed.error';

@Catch(SignInFailedError)
export class AdminSignInExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if(exception instanceof SignInFailedError) {
      super.catch(new UnauthorizedException('Sign in failed'), host);
      return;
    }

    super.catch(exception, host);
  }
}