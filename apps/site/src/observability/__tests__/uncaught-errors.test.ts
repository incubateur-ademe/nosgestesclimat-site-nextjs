import { beforeEach, describe, expect, it, vi } from 'vitest'

const { error } = vi.hoisted(() => ({ error: vi.fn() }))
vi.mock('@/logger/logger.browser', () => ({ default: { error } }))

import { isServerReportedError, reportUncaughtError } from '../uncaught-errors'

describe('isServerReportedError', () => {
  it('recognises the digest a server render leaves on its error', () => {
    const reported = Object.assign(new Error('boom'), { digest: 'abc' })

    expect(isServerReportedError(reported)).toBe(true)
    expect(isServerReportedError(new Error('boom'))).toBe(false)
    expect(isServerReportedError(null)).toBe(false)
    expect(isServerReportedError('boom')).toBe(false)
  })
})

describe('reportUncaughtError', () => {
  beforeEach(() => error.mockClear())

  it('reports the error with the scope that names its origin', () => {
    reportUncaughtError(new Error('boom'), 'site.view.uncaughtError')

    expect(error).toHaveBeenCalledOnce()
    expect(error.mock.calls[0][1]).toEqual({ scope: 'site.view.uncaughtError' })
  })

  it('stays silent for an error the server already reported', () => {
    reportUncaughtError({ digest: 'abc' }, 'site.view.uncaughtError')

    expect(error).not.toHaveBeenCalled()
  })

  it('wraps a rejection reason that is not an Error', () => {
    reportUncaughtError('boom', 'site.view.unhandledRejection')

    expect(error.mock.calls[0][0]).toBeInstanceOf(Error)
  })
})
