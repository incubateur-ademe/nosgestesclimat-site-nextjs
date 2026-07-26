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

export function matchCodeError<R>(
  error: CodeError,
  cases: {
    invalid: (error: InvalidCodeError) => R
    rate_limited: (error: RateLimitedError) => R
    unknown: (error: UnknownCodeError) => R
  }
): R {
  switch (error.code) {
    case 'invalid':
      return cases.invalid(error)
    case 'rate_limited':
      return cases.rate_limited(error)
    case 'unknown':
      return cases.unknown(error)
  }
}

export function matchEmailError<R>(
  error: EmailError,
  cases: {
    rate_limited: (error: RateLimitedError) => R
    unknown: (error: UnknownCodeError) => R
  }
): R {
  switch (error.code) {
    case 'rate_limited':
      return cases.rate_limited(error)
    case 'unknown':
      return cases.unknown(error)
  }
}
