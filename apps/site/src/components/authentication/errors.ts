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
  | { code: 'rate_limited'; message: string }
  | { code: 'unknown'; message: string }

export type EmailError =
  | { code: 'rate_limited'; message: string }
  | { code: 'unknown'; message: string }

export const expiredCodeError = (): CodeError => ({
  code: 'expired',
  message: 'Le code a expiré',
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
