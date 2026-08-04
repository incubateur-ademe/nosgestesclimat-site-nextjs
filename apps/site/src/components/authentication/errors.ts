import type { TFunction } from 'i18next'

/**
 * Errors returned by auth server actions.
 *
 * These must stay plain serializable objects: server actions (`'use server'`)
 * return them to client components through React Flight, which cannot
 * serialize `Error` instances (custom properties like `code` are dropped and
 * a "Error objects are not supported" warning is emitted).
 */
export type CodeError =
  | { code: 'expired'; message: string }
  | { code: 'invalid'; message: string }
  | { code: 'account_conflict'; message: string }
  | { code: 'rate_limited'; message: string }
  | { code: 'unknown'; message: string }

export type EmailError =
  | { code: 'rate_limited'; message: string }
  | { code: 'unknown'; message: string }

export type Translate = TFunction

export const expiredCodeError = (t: Translate): CodeError => ({
  code: 'expired',
  message: t('signIn.code.expired', 'Le code a expiré'),
})

/**
 * The server rejected the login because the current session (anonymous user
 * id) is already attached to another verified account. The user must start a
 * fresh session (log out / clear cookies) before logging in with this email.
 */
export const accountConflictError = (t: Translate): CodeError => ({
  code: 'account_conflict',
  message: t(
    'signIn.code.accountConflict',
    'Session déjà associée à un autre compte'
  ),
})

export const invalidCodeError = (t: Translate): CodeError => ({
  code: 'invalid',
  message: t('signIn.code.invalid', 'Code invalide'),
})

export const rateLimitedError = (t: Translate): EmailError => ({
  code: 'rate_limited',
  message: t('signIn.code.rateLimited', 'Trop de requêtes'),
})

export const unknownCodeError = (t: Translate): EmailError => ({
  code: 'unknown',
  message: t('common.errors.errorHappened', 'Erreur inconnue'),
})
