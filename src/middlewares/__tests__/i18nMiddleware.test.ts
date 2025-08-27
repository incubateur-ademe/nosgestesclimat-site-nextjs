import i18nMiddleware from '@/middlewares/i18nMiddleware'
import { NextRequest, NextResponse } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock next-i18n-router
vi.mock('next-i18n-router', () => ({
  i18nRouter: vi.fn((request, config) => {
    // Simulate normal i18nRouter behavior
    return NextResponse.next()
  }),
}))

describe('i18nMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createMockRequest = (
    pathname: string,
    searchParams: Record<string, string> = {},
    cookies: Record<string, string> = {},
    headers: Record<string, string> = {}
  ): NextRequest => {
    const url = new URL(`https://example.com${pathname}`)
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    const request = new NextRequest(url)

    // Mock cookies
    Object.entries(cookies).forEach(([name, value]) => {
      request.cookies.set(name, value)
    })

    // Mock headers
    Object.entries(headers).forEach(([name, value]) => {
      request.headers.set(name, value)
    })

    return request
  }

  describe('Locale change via lang parameter', () => {
    it('should set locale cookie when lang parameter is valid', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie?.value).toBe('en')
      expect(cookie?.maxAge).toBe(31536000)
    })

    it('should not redirect when lang parameter is provided', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)

      // Should not redirect, just set cookie and continue
      expect(response.status).not.toBe(307)
      expect(response).toBeInstanceOf(NextResponse)
    })

    it('should handle non-default locale', async () => {
      const request = createMockRequest('/en/simulateur/bilan', { lang: 'fr' })

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie?.value).toBe('fr')
    })

    it('should not set cookie if locale is invalid', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', {
        lang: 'invalid',
      })

      const response = await i18nMiddleware(request)

      // Should fall back to i18nRouter for invalid locales
      expect(response).toBeInstanceOf(NextResponse)
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie).toBeUndefined()
    })
  })

  describe('No lang parameter', () => {
    it('should delegate to i18nRouter when no lang parameter', async () => {
      const request = createMockRequest('/fr/simulateur/bilan')

      const response = await i18nMiddleware(request)

      // Should delegate to i18nRouter
      expect(response).toBeInstanceOf(NextResponse)
    })

    it('should handle root path without lang parameter', async () => {
      const request = createMockRequest('/')

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
    })

    it('should handle URLs with multiple segments without lang parameter', async () => {
      const request = createMockRequest('/fr/simulateur/bilan/resultats')

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
    })
  })

  describe('Cookie handling', () => {
    it('should set locale cookie with correct options', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)
      const cookie = response.cookies.get('NEXT_LOCALE')

      expect(cookie?.value).toBe('en')
      expect(cookie?.maxAge).toBe(31536000)
    })

    it('should not set cookie when no lang parameter', async () => {
      const request = createMockRequest('/fr/simulateur/bilan')

      const response = await i18nMiddleware(request)
      const cookie = response.cookies.get('NEXT_LOCALE')

      expect(cookie).toBeUndefined()
    })
  })

  describe('Edge cases', () => {
    it('should handle empty URLs', async () => {
      const request = createMockRequest('/')

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
    })

    it('should handle URLs with special characters', async () => {
      const request = createMockRequest('/fr/simulateur/bilan%20test', {
        lang: 'en',
      })

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie?.value).toBe('en')
    })

    it('should handle multiple search parameters', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', {
        lang: 'en',
        other: 'param',
        test: 'value',
      })

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie?.value).toBe('en')
    })
  })
})
