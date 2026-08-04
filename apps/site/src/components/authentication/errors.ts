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

export const expiredCodeError = (): CodeError => ({
  code: 'expired',
  message: 'Le code a expiré',
})

/**
 * The server rejected the login because the current session (anonymous user
 * id) is already attached to another verified account. The user must start a
 * fresh session (log out / clear cookies) before logging in with this email.
 */
export const accountConflictError = (): CodeError => ({
  code: 'account_conflict',
  message: 'Session déjà associée à un autre compte',
})

export const invalidCodeError = (): CodeError => ({
  code: 'invalid',
  message: 'Code invalide',
})

export const rateLimitedError = (): EmailError => ({
  code: 'rate_limited',
  message: 'Trop de requêtes',
})

export const unknownCodeError = (): EmailError => ({
  code: 'unknown',
  message: 'Erreur inconnue',
})
