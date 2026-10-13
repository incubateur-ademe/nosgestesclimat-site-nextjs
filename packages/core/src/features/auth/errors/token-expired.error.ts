import { DomainError } from '../../../lib/errors.ts'

export class TokenExpiredError extends DomainError<'token_expired'> {
  constructor(message = 'Token expired') {
    super('token_expired', message)
  }
}
