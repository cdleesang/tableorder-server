import { Prisma } from '@prisma/client';
import { DatabaseError, EntityNotFoundErrors, UniqueFieldDuplicateError } from '../errors';

export const legacyErrorHandleExtension = Prisma.defineExtension({
  name: 'legacy error handle',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        let result: any;

        try {
          result = await query(args);
        } catch(err) {
          if(err instanceof Prisma.PrismaClientKnownRequestError) {
            switch(err.code) {
              case 'P2002':
                throw new UniqueFieldDuplicateError((err.meta as {target: [string]}).target[0]);
              case 'P2025':
                if(model) {
                  throw new EntityNotFoundErrors[model]();
                }
              // no default
            }
          }

          throw new DatabaseError();
        }

        if(operation === 'findFirst' || operation === 'findUnique') {
          const isRawQuery = !model;
          
          if(!result && !isRawQuery) {
            throw new EntityNotFoundErrors[model]();
          }
        }

        return result;
      },
    },
  },
});