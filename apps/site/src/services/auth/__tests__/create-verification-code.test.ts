import {
  RateLimitedError,
  UnknownCodeError,
} from '@/components/authentication/errors'
import { serverLoggerMock } from '@/helpers/tests/mockLogger'
import { maskEmail } from '@nosgestesclimat/core/lib/pii'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createVerificationCode } from '../create-verification-code'

const mocks = vi.hoisted(() => ({
  createVerificationCode: vi.fn(),
  sendEmail: vi.fn(),
  after: vi.fn(),
}))

vi.mock('@/adapters/redis/client', async () => {
  const { mockRedisClient } = await import('@/helpers/tests/mockRedisClient')

  return { redis: mockRedisClient() }
})

vi.mock('@/adapters/brevoClient', () => ({
  sendEmail: mocks.sendEmail,
}))

vi.mock('@/logger/logger.server', () => ({ default: serverLoggerMock }))

vi.mock(
  '@nosgestesclimat/core/features/auth/services/create-verification-code.service',
  () => ({
    createCreateVerificationCodeService: vi.fn(
      () => mocks.createVerificationCode
    ),
  })
)

vi.mock('next/server', () => ({
  after: mocks.after,
}))

// The real rate limiter is used on purpose against the fake Redis above: its
// keys persist across the tests of this file, so every test uses a distinct
// email.
describe('createVerificationCode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.createVerificationCode.mockResolvedValue({
      email: 'rate-limit@example.com',
      expirationDate: new Date('2026-01-02T03:04:05.678Z'),
    })
  })

  it('returns the expiration date and lowercases the email', async () => {
    const result = await createVerificationCode({
      email: 'Success@Example.com',
      locale: 'fr',
    })

    expect(result).toEqual({
      success: true,
      data: { expirationDate: new Date('2026-01-02T03:04:05.678Z') },
    })
    expect(mocks.createVerificationCode).toHaveBeenCalledWith({
      email: 'success@example.com',
      locale: 'fr',
    })
    expect(serverLoggerMock.child).toHaveBeenCalledWith({
      email: maskEmail('Success@Example.com'),
      scope: 'site.action.createVerificationCode',
    })
    expect(serverLoggerMock.child).toHaveBeenCalledWith({ locale: 'fr' })
    expect(serverLoggerMock.info).toHaveBeenCalledWith(
      'VerificationCode created',
      expect.objectContaining({
        expirationDate: new Date('2026-01-02T03:04:05.678Z'),
        durationMs: expect.any(Number),
      })
    )
  })

  it('throttles an immediate repeat for the same email', async () => {
    const first = await createVerificationCode({
      email: 'throttled@example.com',
      locale: 'fr',
    })
    const second = await createVerificationCode({
      email: 'throttled@example.com',
      locale: 'fr',
    })

    expect(first.success).toBe(true)
    expect(second).toEqual({
      success: false,
      error: new RateLimitedError(),
    })
    expect(mocks.createVerificationCode).toHaveBeenCalledTimes(1)
  })

  it('throttles a repeat of the same email with different casing', async () => {
    const first = await createVerificationCode({
      email: 'Case@Example.com',
      locale: 'fr',
    })
    const second = await createVerificationCode({
      email: 'case@example.com',
      locale: 'fr',
    })

    expect(first.success).toBe(true)
    expect(second).toEqual({
      success: false,
      error: new RateLimitedError(),
    })
    expect(mocks.createVerificationCode).toHaveBeenCalledTimes(1)
    expect(mocks.createVerificationCode).toHaveBeenCalledWith({
      email: 'case@example.com',
      locale: 'fr',
    })
  })

  it('defaults a missing locale to fr', async () => {
    await createVerificationCode({ email: 'default-locale@example.com' })

    expect(mocks.createVerificationCode).toHaveBeenCalledWith({
      email: 'default-locale@example.com',
      locale: 'fr',
    })
  })

  it('rejects an unsupported locale with the unknown error', async () => {
    const result = await createVerificationCode({
      email: 'bad-locale@example.com',
      locale: 'de',
    })

    expect(result).toEqual({
      success: false,
      error: new UnknownCodeError(),
    })
    expect(mocks.createVerificationCode).not.toHaveBeenCalled()
  })

  it('rejects an invalid email with the unknown error', async () => {
    const result = await createVerificationCode({
      email: 'not-an-email',
      locale: 'fr',
    })

    expect(result).toEqual({
      success: false,
      error: new UnknownCodeError(),
    })
    expect(mocks.createVerificationCode).not.toHaveBeenCalled()
  })

  it('maps a service failure to the unknown error and logs it', async () => {
    const failure = new Error('boom')
    mocks.createVerificationCode.mockRejectedValue(failure)

    const result = await createVerificationCode({
      email: 'throwing@example.com',
      locale: 'fr',
    })

    expect(result).toEqual({
      success: false,
      error: new UnknownCodeError(),
    })
    expect(serverLoggerMock.error).toHaveBeenCalledWith(
      failure,
      expect.objectContaining({ durationMs: expect.any(Number) })
    )
  })
})
