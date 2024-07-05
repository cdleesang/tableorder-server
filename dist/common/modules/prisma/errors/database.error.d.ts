import { Prisma } from '@prisma/client';
type PrismaError = Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientUnknownRequestError | Prisma.PrismaClientInitializationError | Prisma.PrismaClientRustPanicError | Prisma.PrismaClientValidationError;
export declare class DatabaseError extends Error {
    prismaError?: PrismaError | undefined;
    constructor(prismaError?: PrismaError | undefined);
}
export {};
