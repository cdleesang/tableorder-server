import { GetResult, Operation, OperationPayload } from '@prisma/client/runtime/library';

export type PrismaReturnType<Payload extends OperationPayload, Args> = {
  [Op in Operation]: GetResult<Payload, Args, Op>;
};