import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!global.__prisma) {
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
    global.__prisma = new PrismaClient({ adapter });
  }

  return global.__prisma;
}

// Fallback if your installed @prisma/adapter-neon version doesn't accept
// { connectionString } directly and throws on the constructor above:
//
// import { Pool, neonConfig } from '@neondatabase/serverless';
// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaNeon(pool);