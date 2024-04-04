import { PrismaClient } from '@prisma/client';
import { errorHandleExtension } from '../extensions/error-handle.extension';

function extendClient(basePrismaClient: PrismaClient) {
  return basePrismaClient
    .$extends(errorHandleExtension);
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    // eslint-disable-next-line no-constructor-return
    return extendClient(this) as this;
  }
}

export const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>;