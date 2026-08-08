import { PrismaClient } from '@prisma/client'
import { neon } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL!

function createPrismaClient() {
  if (process.env.NODE_ENV === 'production') {
    // Neon serverless for Vercel
    const sql = neon(connectionString)
    const adapter = new PrismaNeon(sql)
    return new PrismaClient({ adapter })
  }
  // Local dev
  return new PrismaClient({
    log: ['warn', 'error'],
  })
}

export const db =
  globalForPrisma.prisma ??
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
