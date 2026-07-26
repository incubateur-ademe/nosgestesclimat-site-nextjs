import type { ErrorWithCode } from './errors.ts'

export type Success<Data> = Data extends void
  ? { success: true }
  : { success: true; data: Data }

type Failure<Err extends ErrorWithCode = ErrorWithCode> = {
  success: false
  error: Err
}

export type Result<Data, Err extends ErrorWithCode = ErrorWithCode> =
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

export function failure<Err extends ErrorWithCode>(
  error: Err
): Failure<Err> {
  return { success: false, error }
}

/**
 * Ensures a Result containing ErrorWithCode instances survives React Flight
 * serialization when crossing the server → client boundary (server action
 * return values).
 *
 * React Flight's `serializeErrorValue` only preserves `name`, `message`, and
 * `stack` for `instanceof Error` values — custom properties like `.code`
 * are discarded. In production, the entire Error is wiped.
 *
 * This extracts the discriminator payload (`code`, `name`, `message`) into a
 * plain object per error, which React Flight serializes correctly.
 *
 * On the server, the original ErrorWithCode keeps its full Error capabilities
 * (stack trace, `instanceof`, etc.) for logging/Sentry.
 *
 * Always call this on the Result before returning from a server action.
 *
 * @see ReactFlightServer.serializeErrorValue
 * @see https://github.com/vercel/next.js/issues/79390
 */
export function toSerializable<T, E extends ErrorWithCode>(
  result: Result<T, E>
): Result<T, E> {
  if (result.success) return result
  return failure({ ...result.error })
}
