import { describe, expect, it } from 'vitest'
import { ForbiddenError } from '../../errors/forbidden.error.ts'
import { assertOwnership } from '../assert-ownership.ts'

describe('assertOwnership', () => {
  it('does not throw when userIds match', () => {
    expect(() => assertOwnership('abc', 'abc')).not.toThrow()
  })

  it('throws ForbiddenError when userIds differ', () => {
    expect(() => assertOwnership('abc', 'xyz')).toThrow(ForbiddenError)
  })

  it('throws ForbiddenError when sessionUserId is undefined', () => {
    expect(() => assertOwnership(undefined, 'abc')).toThrow(ForbiddenError)
  })
})
