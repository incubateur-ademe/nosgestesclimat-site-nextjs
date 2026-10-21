import type { Transaction } from '../../../lib/transaction.ts'
import { prisma } from '../../../prisma/client.ts'
import { deleteAllRefreshTokensForUserId } from '../repositories/refresh-token.repository.ts'

export async function revokeAllSessions(
  userId: string,
  { session = prisma }: { session: Transaction }
): Promise<void> {
  await deleteAllRefreshTokensForUserId(userId, { session })
}
