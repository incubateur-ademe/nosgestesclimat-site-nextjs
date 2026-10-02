import type { Logger } from '../features/logger/index.ts'
import type { Result } from './result.ts'
import { toError } from './to-error.ts'

/**
 * Creates a settle function that waits for every side effect and reports the
 * ones that failed, either by rejecting or by resolving to a failure: none
 * of them fails the caller's main operation.
 */
export const createSettle =
  ({ logger }: { logger: Logger }) =>
  async (label: string, sideEffects: Promise<Result<void> | void>[]) => {
    const results = await Promise.allSettled(sideEffects)

    for (const [index, result] of results.entries()) {
      let error: unknown
      if (result.status === 'rejected') error = result.reason
      else if (result.value && !result.value.success) error = result.value.error
      if (error) {
        logger.error(toError(error), { label, index })
      }
    }
  }
