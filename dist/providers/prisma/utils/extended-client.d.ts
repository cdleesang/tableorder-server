import { PrismaClient } from '@prisma/client';
declare function extendClient(basePrismaClient: PrismaClient): import("@prisma/client/runtime/library").DynamicClientExtensionThis<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & {
    result: {};
    model: {};
    query: {};
    client: {};
}>, import(".prisma/client").Prisma.TypeMapCb, {
    result: {};
    model: {};
    query: {};
    client: {};
}>;
export declare const ExtendedPrismaClient: new (options?: ConstructorParameters<typeof PrismaClient>[0]) => ReturnType<typeof extendClient>;
export {};
