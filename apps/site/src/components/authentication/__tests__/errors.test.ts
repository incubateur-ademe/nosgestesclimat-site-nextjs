import { describe, expect, it } from 'vitest'
import { AccountConflictError } from '../errors'

describe('AccountConflictError', () => {
  it('exposes the account_conflict code with an actionable message', () => {
    const error = new AccountConflictError()
    expect(error.code).toBe('account_conflict')
    expect(error.message).toBe('Session déjà associée à un autre compte')
  })
})
