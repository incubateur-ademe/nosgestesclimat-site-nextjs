import { vi } from 'vitest'

import type { Logger } from '../features/logger/index.ts'
import { spanDecorator } from '../features/logger/with-span.ts'

/** Spied function, typed so the declaration build can name it: an inferred
 * `Mock` fails it (TS2742, `@vitest/spy` only a transitive dependency). */
type Spy = (...args: unknown[]) => void

export type TestLogger = Logger & {
  error: Spy
  warn: Spy
  info: Spy
  debug: Spy
  fatal: Spy
  child: Spy
  setSpanAttribute: Spy
}

/**
 * Spied `Logger` for tests, the site's specs included
 * (`helpers/tests/mockLogger.ts`). `child` returns the same instance, so
 * assertions keep targeting the top-level spies whatever the bindings.
 */
export function createTestLogger(): TestLogger {
  const logger = {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    fatal: vi.fn(),
    child: vi.fn(),
    setSpanAttribute: vi.fn(),
  }

  const full: TestLogger = {
    ...logger,
    // No span in a test: what a service hands to the logger is asserted, not
    // the trace it sits in. The body logs through the same spied instance,
    // whichever scope it runs under.
    // Like the real loggers: the body gets the logger bound to the scope and to
    // what names the operation.
    withSpan: spanDecorator((scope, run, bindings) => {
      logger.child({ ...bindings, scope })

      return run(full)
    }),
  }

  logger.child.mockReturnValue(full)

  return full
}
