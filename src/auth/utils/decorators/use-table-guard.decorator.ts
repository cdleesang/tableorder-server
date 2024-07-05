import { TypedException } from '@nestia/core';
import { UnauthorizedException, UseGuards, applyDecorators } from '@nestjs/common';
import { TableGuard } from '../guards/table.guard';

export const UseTableGuard = () => applyDecorators(
  UseGuards(TableGuard),
  TypedException<UnauthorizedException>(401, '로그인되지 않음'),
);