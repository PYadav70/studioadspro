import 'dotenv/config';
import { PrismaNeonHttp } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaDbUrl: string | undefined;
};

export function getPrisma(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL?.trim();

  // Validate connection string: must exist, start with postgres(ql)://, contain credentials '@', and not be dummy/placeholder
  if (
    !connectionString ||
    (!connectionString.startsWith('postgres://') && !connectionString.startsWith('postgresql://')) ||
    !connectionString.includes('@') ||
    connectionString.includes('placeholder')
  ) {
    return null;
  }

  // Ensure process.env.DATABASE_URL is explicitly set for Prisma engine internals
  process.env.DATABASE_URL = connectionString;

  if (globalForPrisma.prisma && globalForPrisma.prismaDbUrl === connectionString) {
    return globalForPrisma.prisma;
  }

  try {
    const adapter = new PrismaNeonHttp(connectionString, {});
    const client = new PrismaClient({ adapter });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client;
      globalForPrisma.prismaDbUrl = connectionString;
    }

    return client;
  } catch (err) {
    console.error('Failed to initialize Prisma Client with Neon HTTP adapter:', err);
    return null;
  }
}

export const prisma = getPrisma();


