import type { ErrorWithCode } from './errors.ts'

/**
 * A minimal serializable error contract. `ErrorWithCode` instances satisfy it,
 * and so do plain `{ code, message }` objects — which is what server actions
 * must return: React Flight cannot serialize `Error` instances across the
 * server/client boundary.
 */
export type ErrorPayload = { code: string; message: string }

export type Success<Data> = Data extends void
  ? { success: true }
  : { success: true; data: Data }

type Failure<Err extends ErrorPayload = ErrorWithCode> = {
  success: false
  error: Err
}

export type Result<Data, Err extends ErrorPayload = ErrorWithCode> =
  | Success<Data>
  | Failure<Err>

export function success(): { success: true }
export function success<Data>(data: Data): Success<Data>
export function success<Data>(data?: Data) {
  if (arguments.length === 0) {
    return { success: true }
  }
  return { success: true, data }
}

export function failure<Err extends ErrorPayload>(error: Err): Failure<Err> {
  return { success: false, error }
}
