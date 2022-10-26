import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  // Check incoming query type
  if (params.action == 'delete') {
    // Change action to an update
    params.action = 'update';
    // Set field value
    params.args.data = { deletedAt: new Date().toISOString() };
  }

  return next(params);
});

export default prisma;
