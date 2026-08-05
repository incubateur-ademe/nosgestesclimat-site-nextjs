import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuth } from '@/components/authentication/AuthProvider'
import type { AuthContextValue } from '@/components/authentication/AuthProvider'
import { AccountConflictError } from '@/components/authentication/errors'
import VerificationCodeForm from '../VerificationCodeForm'

vi.mock('@/components/authentication/AuthProvider', async () => {
  const actual = await vi.importActual('@/components/authentication/AuthProvider')
  return { ...actual, useAuth: vi.fn() }
})

const defaultAuth: AuthContextValue = {
  state: { phase: 'idle', emailError: null },
  sendEmail: vi.fn() as unknown as AuthContextValue['sendEmail'],
  submitCode: vi.fn(),
  resendCode: vi.fn() as unknown as AuthContextValue['resendCode'],
  goBack: vi.fn(),
  reset: vi.fn(),
  clearCodeError: vi.fn(),
  isCreatingCode: false,
  mode: undefined,
}

describe('VerificationCodeForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows a generic message with a contact link on account conflict', () => {
    vi.mocked(useAuth).mockReturnValue({
      ...defaultAuth,
      state: {
        phase: 'code_sent',
        email: 'a@b.com',
        pending: { email: 'a@b.com', expirationDate: new Date() },
        cooldownUntil: 0,
        isResending: false,
        codeError: new AccountConflictError(),
        resendError: null,
      },
    } as AuthContextValue)

    render(<VerificationCodeForm />)

    const link = screen.getByRole('link', { name: 'nous contacter' })
    expect(link).toHaveAttribute('href', '/contact')
    expect(screen.getByText(/si elle persiste\./)).toBeInTheDocument()
    // The message must not reveal the session conflict (account-enumeration
    // oracle): the previous specific wording is gone.
    expect(screen.queryByText(/Session déjà associée/)).not.toBeInTheDocument()
  })
})
