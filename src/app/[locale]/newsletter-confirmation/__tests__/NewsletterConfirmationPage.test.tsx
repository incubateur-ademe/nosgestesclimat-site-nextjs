import { renderWithWrapper } from '@/helpers/tests/wrapper'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { act, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NewsletterConfirmationPage from '../page'

// Mock HeaderServer to avoid async client component errors
vi.mock('@/components/layout/HeaderServer', () => ({
  default: () => <header data-testid="header">Header</header>,
}))

// Mock Footer
vi.mock('@/components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

// Mock the message components to render test IDs so we can verify they're rendered
vi.mock('../_components/NewsletterSuccessMessage', () => ({
  __esModule: true,
  default: ({ locale }: { locale: string }) => (
    <div data-testid="newsletter-success-message" data-locale={locale}>
      Success Message
    </div>
  ),
}))

vi.mock('../_components/NewsletterErrorMessage', () => ({
  __esModule: true,
  default: ({ locale }: { locale: string }) => (
    <div data-testid="newsletter-error-message" data-locale={locale}>
      Error Message
    </div>
  ),
}))

vi.mock('../_components/NewsletterInvalidMessage', () => ({
  __esModule: true,
  default: ({ locale }: { locale: string }) => (
    <div data-testid="newsletter-invalid-message" data-locale={locale}>
      Invalid Message
    </div>
  ),
}))

const mockNotFound = vi.mocked(notFound)

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
    expect(screen.getByTestId('newsletter-success-message')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter-success-message')).toHaveAttribute(
      'data-locale',
      i18nConfig.defaultLocale
    )
    expect(
      screen.queryByTestId('newsletter-error-message')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('newsletter-invalid-message')
    ).not.toBeInTheDocument()
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
    expect(
      screen.getByTestId('newsletter-invalid-message')
    ).toBeInTheDocument()
    expect(screen.getByTestId('newsletter-invalid-message')).toHaveAttribute(
      'data-locale',
      i18nConfig.defaultLocale
    )
    expect(
      screen.queryByTestId('newsletter-success-message')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('newsletter-error-message')
    ).not.toBeInTheDocument()
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
    expect(screen.getByTestId('newsletter-error-message')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter-error-message')).toHaveAttribute(
      'data-locale',
      i18nConfig.defaultLocale
    )
    expect(
      screen.queryByTestId('newsletter-success-message')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('newsletter-invalid-message')
    ).not.toBeInTheDocument()
  })

  it('should redirect to the 404 page if wrong success param is passed', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({ success: 'toto' as 'true' }),
    }

    // When & Then
    await expect(NewsletterConfirmationPage(props)).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
  })

  it('should redirect to the 404 page if wrong status param is passed', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: i18nConfig.defaultLocale as Locale }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '505' as '500',
      }),
    }

    // When & Then
    await expect(NewsletterConfirmationPage(props)).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
  })
})
