import { Type } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const EntityNotFoundErrors = Object.keys(Prisma.ModelName).reduce((prev, curr) => ({
  ...prev,
  [curr]: class EntityNotFoundError extends Error {
    constructor() {
      super(`${curr} not found`);
    }
  },
}), {} as Record<Prisma.ModelName, Type<Error>>);