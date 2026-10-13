import { createTestLogger } from '@nosgestesclimat/core/test-utils/logger'

/**
 * Stand-in for the site's server logger, shared by the specs that assert on a
 * line. `child` and `openSpan` hand the same instance back whatever the scope
 * or the span, so an assertion always reads the top-level spies.
 *
 * Wire it with `vi.mock('@/logger/logger.server', () => ({ default: serverLoggerMock }))`.
 */
export const serverLoggerMock = createTestLogger()
