import * as jose from 'jose'
import { SessionCryptoError } from '../errors/session-crypto.error.ts'
import { getSessionEncryptionKey } from '../helpers/get-session-encryption-key.ts'
import type { Session } from '../types/session.ts'

const EXPIRATION_BYPASS_DATE = new Date(0)

export async function decryptSession(token: string): Promise<Session> {
  const { payload } = await jose
    .jwtDecrypt(token, getSessionEncryptionKey(), {
      currentDate: EXPIRATION_BYPASS_DATE,
    })
    .catch(() => {
      throw new SessionCryptoError()
    })

  return {
    userId: payload.userId as string,
    email: payload.email as string | undefined,
    iat: payload.iat as number,
    exp: payload.exp as number,
  }
}
