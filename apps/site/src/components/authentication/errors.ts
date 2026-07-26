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

export function invalidCodeError(message?: string) {
  return {
    name: 'InvalidCodeError',
    code: 'invalid' as const,
    message: message ?? 'Code invalide',
  }
}

export function rateLimitedError(message?: string) {
  return {
    name: 'RateLimitedError',
    code: 'rate_limited' as const,
    message: message ?? 'Trop de requêtes',
  }
}

export function unknownCodeError(message?: string) {
  return {
    name: 'UnknownCodeError',
    code: 'unknown' as const,
    message: message ?? 'Erreur inconnue',
  }
}

export function matchError<E extends ErrorWithCode<C>, C extends string, R>(
  error: E,
  cases: Record<E['code'], (error: E) => R>
): R {
  return cases[error.code](error)
}
