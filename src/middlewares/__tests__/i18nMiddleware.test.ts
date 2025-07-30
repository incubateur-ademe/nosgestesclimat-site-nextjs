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

  describe('Iframe handling', () => {
    it('should handle iframes without cookies (incognito mode)', async () => {
      const request = createMockRequest(
        '/en/simulateur/bilan', // Use non-default locale
        { iframe: 'true' },
        {} // No cookies
      )

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      // The cookie should be set for iframe requests without cookies
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie?.value).toBe('en')
    })

    it('should use lang parameter for iframes', async () => {
      const request = createMockRequest(
        '/simulateur/bilan',
        { iframe: 'true', lang: 'en' },
        {} // No cookies
      )

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en')
    })

    it('should detect iframes via referer', async () => {
      const request = createMockRequest(
        '/simulateur/bilan',
        {},
        {},
        { referer: 'https://example.com/page?iframe=true' }
      )

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
    })

    it('should not set cookie for default locale in iframe without cookies', async () => {
      const request = createMockRequest(
        '/fr/simulateur/bilan', // Use default locale
        { iframe: 'true' },
        {} // No cookies
      )

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      // Should not set cookie for default locale
      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie).toBeUndefined()
    })
  })

  describe('Locale change via lang parameter', () => {
    it('should redirect to new locale', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)

      expect(response.status).toBe(307)
      const location = response.headers.get('location')
      expect(location).toContain('/en/simulateur/bilan')
      expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en')
    })

    it('should clean URL if locale is already correct', async () => {
      const request = createMockRequest('/en/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)

      expect(response.status).toBe(307)
      const location = response.headers.get('location')
      expect(location).not.toContain('lang=en')
    })

    it('should not redirect if locale is invalid', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', {
        lang: 'invalid',
      })

      const response = await i18nMiddleware(request)

      expect(response.status).not.toBe(307)
    })
  })

  describe('URL construction with locale', () => {
    it('should correctly build URL with new locale', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)
      const location = response.headers.get('location')

      expect(location).toContain('/en/simulateur/bilan')
    })

    it('should add locale if it does not exist in path', async () => {
      const request = createMockRequest('/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)
      const location = response.headers.get('location')

      expect(location).toContain('/en/simulateur/bilan')
    })
  })

  describe('Cookie handling', () => {
    it('should set locale cookie', async () => {
      const request = createMockRequest('/fr/simulateur/bilan', { lang: 'en' })

      const response = await i18nMiddleware(request)
      const cookie = response.cookies.get('NEXT_LOCALE')

      expect(cookie?.value).toBe('en')
      expect(cookie?.maxAge).toBe(31536000)
    })
  })

  describe('Error cases and edge cases', () => {
    it('should handle empty URLs', async () => {
      const request = createMockRequest('/')

      const response = await i18nMiddleware(request)

      expect(response).toBeInstanceOf(NextResponse)
    })

    it('should handle URLs with multiple segments', async () => {
      const request = createMockRequest('/fr/simulateur/bilan/resultats', {
        lang: 'en',
      })

      const response = await i18nMiddleware(request)
      const location = response.headers.get('location')

      expect(location).toContain('/en/simulateur/bilan/resultats')
    })
  })
})
