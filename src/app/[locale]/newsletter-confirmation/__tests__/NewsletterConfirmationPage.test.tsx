import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import NewsletterErrorMessage from '../_components/NewsletterErrorMessage'
import NewsletterInvalidMessage from '../_components/NewsletterInvalidMessage'
import NewsletterSuccessMessage from '../_components/NewsletterSuccessMessage'
import NewsletterConfirmationPage from '../page'

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useSearchParams: () => new URLSearchParams(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => ''),
}))

vi.mock('@/components/layout/HeaderServer', () => ({
  __esModule: true,
  default: vi.fn(() => null),
}))

vi.mock('../_components/NewsletterSuccessMessage', () => ({
  __esModule: true,
  default: vi.fn(() => null),
}))

vi.mock('../_components/NewsletterErrorMessage', () => ({
  __esModule: true,
  default: vi.fn(() => null),
}))

vi.mock('../_components/NewsletterInvalidMessage', () => ({
  __esModule: true,
  default: vi.fn(() => null),
}))

describe('NewsletterConfirmationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render success message when success=true', async () => {
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({ success: 'true' as const }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(NewsletterSuccessMessage).toHaveBeenCalledWith(
      { locale: i18nConfig.defaultLocale },
      undefined
    )
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })

  it('should render the invalid message when success=false and status=404', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '404' as const,
      }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).toHaveBeenCalledWith(
      { locale: i18nConfig.defaultLocale },
      undefined
    )
  })

  it('should render the error message when success=false and status=500', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '500' as const,
      }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).toHaveBeenCalledWith(
      { locale: i18nConfig.defaultLocale },
      undefined
    )
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })

  it('should redirect to the 404 page if wrong success param is passed', async () => {
    // Given
    const { redirect } = await import('next/navigation')
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({ success: 'toto' as 'true' }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(redirect).toHaveBeenCalledWith(NOT_FOUND_PATH)
  })

  it('should redirect to the 404 page if wrong status param is passed', async () => {
    // Given
    const { redirect } = await import('next/navigation')
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '505' as '500',
      }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(redirect).toHaveBeenCalledWith(NOT_FOUND_PATH)
  })
})
