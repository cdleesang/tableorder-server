import { TypedException } from '@nestia/core';
import { UnauthorizedException, UseGuards, applyDecorators } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';

export const UseAdminGuard = () => applyDecorators(
  UseGuards(AdminGuard),
  TypedException<UnauthorizedException>(401, '로그인되지 않음'),
);