import { describe, expect, it } from 'vitest'
import { SessionCryptoError } from '../../errors/session-crypto.error.ts'
import { encryptSession } from '../../helpers/encrypt-session.ts'
import type { SessionPayload } from '../../types/session.ts'
import { decryptSession } from '../decrypt-session.service.ts'

describe('decryptSession', () => {
  it('round-trips: encrypt then decrypt returns original payload', async () => {
    const payload: SessionPayload = {
      userId: 'abc',
      email: 'test@example.com',
    }
    const token = await encryptSession(payload, 60)
    const decrypted = await decryptSession(token)
    expect(decrypted.userId).toBe('abc')
    expect(decrypted.email).toBe('test@example.com')
  })

  it('throws SessionCryptoError for a corrupted token', async () => {
    await expect(decryptSession('not-a-valid-token')).rejects.toThrow(
      SessionCryptoError
    )
  })

  it('throws SessionCryptoError for an empty string', async () => {
    await expect(decryptSession('')).rejects.toThrow(SessionCryptoError)
  })

  it('returns payload even when token is expired', async () => {
    const payload: SessionPayload = { userId: 'user-1' }
    const token = await encryptSession(payload, -1)
    const result = await decryptSession(token)
    expect(result.userId).toBe('user-1')
  })
})
