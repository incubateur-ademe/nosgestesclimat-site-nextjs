import { DomainError } from '../../../lib/errors.ts'

export class SessionCryptoError extends DomainError<'session_crypto'> {
  constructor(message = 'Invalid session token') {
    super('session_crypto', message)
  }
}
