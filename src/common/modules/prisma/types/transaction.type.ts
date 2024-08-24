import { PrismaService } from '../prisma.service';

export type Tx = Parameters<Parameters<PrismaService['$transaction']>[0]>[0];