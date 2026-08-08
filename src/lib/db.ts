import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Only use Neon adapter when we have a postgresql:// URL in production
  const dbUrl = process.env.DATABASE_URL || ''
  const isNeon = process.env.NODE_ENV === 'production' && dbUrl.startsWith('postgresql://')

  if (isNeon) {
    // Dynamic import for Neon (only on Vercel with postgresql URL)
    const { neon } = require('@neondatabase/serverless')
    const { PrismaNeon } = require('@prisma/adapter-neon')
    const sql = neon(dbUrl)
    const adapter = new PrismaNeon(sql)
    return new PrismaClient({ adapter })
  }

  // Local dev or non-postgresql URL: use regular PrismaClient
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })
}

export const db =
  globalForPrisma.prisma ??
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
