import { DomainError } from '@nosgestesclimat/core/lib/errors'
import type { ErrorWithCode } from '@nosgestesclimat/core/lib/errors'

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

export function matchError<E extends ErrorWithCode, R>(
  error: E,
  cases: { [K in E['code']]: (error: Extract<E, { code: K }>) => R }
): R {
  return (cases as unknown as Record<string, (error: E) => R>)[
    error.code
  ](error)
}
