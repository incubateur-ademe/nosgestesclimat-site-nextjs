import { describe, expect, it } from 'vitest'
import { AccountConflictError } from '../errors'

describe('AccountConflictError', () => {
  it('exposes the account_conflict code with a generic message', () => {
    const error = new AccountConflictError()
    expect(error.code).toBe('account_conflict')
    // Kept generic on purpose: a specific message would let an attacker
    // distinguish this rejection and enumerate existing accounts.
    expect(error.message).toBe('Une erreur est survenue')
  })
})
