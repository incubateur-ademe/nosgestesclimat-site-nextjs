import { DomainError } from '@nosgestesclimat/core/lib/errors'

export class InvalidCodeError extends DomainError<'invalid'> {
  constructor() {
    super('invalid', 'Code invalide')
  }
}

export class RateLimitedError extends DomainError<'rate_limited'> {
  constructor() {
    super('rate_limited', 'Trop de requêtes')
  }
}

export class UnknownCodeError extends DomainError<'unknown'> {
  constructor() {
    super('unknown', 'Erreur inconnue')
  }
}

/**
 * The server rejected the login because the current session (anonymous user
 * id) is already attached to another verified account. The user must start a
 * fresh session (log out / clear cookies) before logging in with this email.
 *
 * The message stays deliberately generic: a specific one would let an attacker
 * distinguish this rejection from the others and use it as an account-existence
 * oracle.
 */
export class AccountConflictError extends DomainError<'account_conflict'> {
  constructor() {
    super('account_conflict', 'Une erreur est survenue')
  }
}

export type CodeError =
  | InvalidCodeError
  | RateLimitedError
  | UnknownCodeError
  | AccountConflictError

export type EmailError = RateLimitedError | UnknownCodeError
