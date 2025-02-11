import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
prisma.$extends({
  query: {
    $allOperations({ model, operation, args, query }) {
      logger.info(`DB: ${model}.${operation}(${JSON.stringify(args)})`);
      return query(args);
    },
  },
});
