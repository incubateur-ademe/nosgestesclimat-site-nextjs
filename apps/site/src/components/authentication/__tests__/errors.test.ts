import { failure } from '@nosgestesclimat/core/lib/result'
import { describe, expect, it } from 'vitest'
import { invalidCodeError, rateLimitedError, unknownCodeError } from '../errors'

// Regression test: auth server actions return `Result` objects to client
// components through React Flight. React Flight cannot serialize `Error`
// instances (custom properties like `code` are dropped, and it logs
// "Only plain objects can be passed to Client Components from Server
// Components. Error objects are not supported."). The error payloads must
// therefore stay plain, JSON-serializable objects.
describe('auth error payloads', () => {
  it.each([
    ['invalidCodeError', invalidCodeError],
    ['rateLimitedError', rateLimitedError],
    ['unknownCodeError', unknownCodeError],
  ] as const)(
    '%s returns a plain object, not an Error instance',
    (_name, factory) => {
      const error = factory()

      expect(error).not.toBeInstanceOf(Error)
      expect(Object.getPrototypeOf(error)).toBe(Object.prototype)
      // The error must survive the server/client wire round-trip with its
      // discriminator intact.
      expect(JSON.parse(JSON.stringify(error))).toEqual(error)
    }
  )

  it('keeps the code after the whole failure Result is serialized', () => {
    const result = failure(invalidCodeError())

    expect(JSON.parse(JSON.stringify(result))).toEqual({
      success: false,
      error: { code: 'invalid', message: 'Code invalide' },
    })
  })
})
