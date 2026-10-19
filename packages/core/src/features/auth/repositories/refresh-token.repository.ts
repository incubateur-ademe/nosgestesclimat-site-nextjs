import { prisma } from '../../../prisma/client.ts'
import type {
  CreateRefreshTokenData,
  RotatedToken,
} from '../types/refresh-token.ts'
import { mapCreateRefreshTokenInput } from './refresh-token.mapper.ts'

export async function createRefreshToken(
  data: CreateRefreshTokenData
): Promise<void> {
  await prisma.refreshToken.create({
    data: mapCreateRefreshTokenInput(data),
  })
}

/**
 * Replaces the token a row carries and keeps the replaced one, which is what
 * tells a concurrent request from a replay. The `WHERE` is the election: one
 * caller matches a given token.
 */
export async function rotateToken({
  hashedToken,
  newHashedToken,
}: {
  hashedToken: string
  newHashedToken: string
}): Promise<RotatedToken | null> {
  const rows = await prisma.$queryRaw<RotatedToken[]>`
    UPDATE ngc."RefreshToken"
    SET token = ${newHashedToken},
        "previousToken" = ${hashedToken},
        "rotatedAt" = NOW()
    WHERE token = ${hashedToken} AND "expiresAt" > NOW()
    RETURNING id, "userId", "rotatedAt"
  `
  return rows[0] ?? null
}

/** The row whose rotation replaced `hashedToken` and that has not rotated again. */
export function findByPreviousToken(hashedToken: string): Promise<{
  id: string
  userId: string
  rotatedAt: Date | null
} | null> {
  return prisma.refreshToken.findFirst({
    where: { previousToken: hashedToken, expiresAt: { gt: new Date() } },
    select: { id: true, userId: true, rotatedAt: true },
  })
}

export async function deleteAllForUserId(userId: string): Promise<void> {
  await prisma.refreshToken.deleteMany({ where: { userId } })
}

export async function deleteAllExpired(
  before: Date = new Date()
): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: { expiresAt: { lt: before } },
  })
}

export function findAllByUserId(
  userId: string
): Promise<{ id: string; token: string; expiresAt: Date }[]> {
  return prisma.refreshToken.findMany({
    where: { userId },
    select: { id: true, token: true, expiresAt: true },
  })
}
