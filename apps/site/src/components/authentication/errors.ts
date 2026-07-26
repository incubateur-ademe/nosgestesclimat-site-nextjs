import type { ErrorWithCode } from '@nosgestesclimat/core/lib/errors'
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

export type CodeError = InvalidCodeError | RateLimitedError | UnknownCodeError

export type EmailError = RateLimitedError | UnknownCodeError

export function matchError<E extends ErrorWithCode<C>, C extends string, R>(
  error: E,
  cases: Record<E['code'], (error: E) => R>
): R {
  const handler = cases[error.code]
  if (!handler) {
    throw new Error(
      `No handler for error code "${String(error.code)}". ` +
        `If this ErrorWithCode crossed a server action boundary, ` +
        `make sure to call toSerializable() on the Result before returning.`
    )
  }
  return handler(error)
}
