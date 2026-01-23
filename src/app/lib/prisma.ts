import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../../generated/prisma/client';
import { env } from '../config/env';

const pool = new Pool({
  connectionString: env.dataBaseUrl,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (env.nodeEnv !== 'production')
  globalForPrisma.prisma = prisma;
