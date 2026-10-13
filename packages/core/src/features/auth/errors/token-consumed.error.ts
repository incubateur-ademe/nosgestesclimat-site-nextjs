import { DomainError } from '../../../lib/errors.ts'

export class TokenConsumedError extends DomainError<'token_consumed'> {
  constructor(message = 'Token already consumed') {
    super('token_consumed', message)
  }
}
