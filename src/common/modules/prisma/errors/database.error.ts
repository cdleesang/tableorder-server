import { Prisma } from '@prisma/client';

type PrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientValidationError;
export class DatabaseError extends Error {
  constructor(public prismaError?: PrismaError) {
    super('Database error');
  }
}