import { TokenConsumedError } from '../errors/token-consumed.error.ts'
import { TokenExpiredError } from '../errors/token-expired.error.ts'
import { hashToken } from '../helpers/hash-token.ts'
import {
  deleteAndReturn,
  findByToken,
} from '../repositories/refresh-token.repository.ts'
import type { SessionTokens } from '../types/session.ts'
import { createSession } from './create-session.service.ts'

export async function rotateSession(
  refreshTokenValue: string,
  email?: string
): Promise<SessionTokens> {
  const hashed = hashToken(refreshTokenValue)

  const deleted = await deleteAndReturn(hashed)

  if (!deleted) {
    const existing = await findByToken(hashed)

    if (existing) {
      throw new TokenExpiredError()
    }

    throw new TokenConsumedError()
  }

  return createSession(deleted.userId, email)
}
