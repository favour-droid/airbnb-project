// import { PrismaClient } from '@prisma/client';

// const PrismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof PrismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? PrismaClientSingleton(); 

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
   

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ??
  new PrismaClient({
    adapter, // ✅ REQUIRED in Prisma v7
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
