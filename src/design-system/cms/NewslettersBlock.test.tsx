import { mswServer } from '@/__tests__/server'
import NewslettersBlock from '@/design-system/cms/NewslettersBlock'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock constants
import { LIST_MAIN_NEWSLETTER } from '@/constants/brevo'

// Mock custom hooks and modules that don't make API calls
import { useMainNewsletter } from '@/hooks/useMainNewsletter'
vi.mock('@/hooks/useMainNewsletter')

import { useClientTranslation } from '@/hooks/useClientTranslation'
vi.mock('@/hooks/useClientTranslation')

import { useLocale } from '@/hooks/useLocale'
import userEvent from '@testing-library/user-event'
vi.mock('@/hooks/useLocale')

// We need to provide a mock for the Trans component for i18n
vi.mock('@/components/translation/trans/TransClient', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Cast mocks to the correct type to allow setting mock values.
const mockedUseMainNewsletter = useMainNewsletter as Mock
const mockedUseLocale = useLocale as Mock
const mockedUseClientTranslation = useClientTranslation as Mock

describe('NewslettersBlock', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure isolation.
    vi.clearAllMocks()

    // Setup default mock return values for hooks that don't make API calls.
    mockedUseMainNewsletter.mockReturnValue({
      data: { totalSubscribers: 12345 },
    })

    // Default locale is French, as the component only renders for 'fr'.
    mockedUseLocale.mockReturnValue('fr')

    mockedUseClientTranslation.mockReturnValue({
      t: (key: string, _?: string, options?: { val: number }) => {
        if (options?.val) {
          return `${options.val} ${key}`
        }
        return key
      },
    })

    // Setup MSW handlers for each test
    mswServer.use(
      // GET /users/v1/:userId/contact - for useGetNewsletterSubscriptions
      http.get('*/users/v1/:userId/contact', () => {
        return HttpResponse.json({
          listIds: [],
        })
      }),

      // PUT /users/v1/:userId - for useUpdateUserSettings
      http.put('*/users/v1/:userId', () => {
        return HttpResponse.json({ success: true })
      }),

      // GET /newsletters/v1/:newsletterId - for useMainNewsletter
      http.get('*/newsletters/v1/:newsletterId', () => {
        return HttpResponse.json({
          id: LIST_MAIN_NEWSLETTER,
          name: 'Main Newsletter',
          totalSubscribers: 12345,
        })
      }),

      // OPTIONS requests for CORS preflight
      http.options('*/users/v1/:userId/contact', () => {
        return HttpResponse.json({})
      }),

      http.options('*/users/v1/:userId', () => {
        return HttpResponse.json({})
      })
    )
  })
  it('should not render if locale is not French', () => {
    mockedUseLocale.mockReturnValue('en') // Set locale to English
    renderWithWrapper(<NewslettersBlock isAuthenticated={true} />, {
      providers: {
        queryClient: true,
      },
    })
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
  })

  it('should render the form with all elements', async () => {
    renderWithWrapper(<NewslettersBlock isAuthenticated={true} />, {
      providers: {
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    expect(screen.getByTestId('newsletter-form')).toBeInTheDocument()
    expect(
      screen.getByTestId('newsletter-saisonniere-checkbox')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('newsletter-transports-checkbox')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('newsletter-logement-checkbox')
    ).toBeInTheDocument()
    expect(screen.getByTestId('newsletter-email-input')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter-submit-button')).toBeInTheDocument()
  })

  it('should successfully subscribe a user and show a success message', async () => {
    const user = userEvent.setup()

    renderWithWrapper(<NewslettersBlock isAuthenticated={true} />, {
      user: { name: 'Test User', email: 'test@example.com' },
      providers: {
        user: true,
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    await user.click(screen.getByTestId('newsletter-transports-checkbox'))
    await user.click(screen.getByTestId('newsletter-submit-button'))

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument()
    })

    // After success, the success message should be visible and the form hidden
    expect(screen.getByTestId('success-message')).toBeInTheDocument()
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
  })

  it('should show an error message if subscription fails', async () => {
    // Override the MSW handler to return an error for this test
    mswServer.use(
      http.put('*/users/v1/:userId', () => {
        return HttpResponse.error()
      })
    )

    const user = userEvent.setup()
    renderWithWrapper(<NewslettersBlock isAuthenticated={true} />, {
      providers: {
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    await user.type(
      screen.getByTestId('newsletter-email-input'),
      'test@example.com'
    )
    await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
    await user.click(screen.getByTestId('newsletter-submit-button'))

    await waitFor(() => {
      expect(screen.getByTestId('submit-error-message')).toBeInTheDocument()
    })
  })

  it('should show an error if no newsletter is selected for a new subscription', async () => {
    const user = userEvent.setup()

    renderWithWrapper(<NewslettersBlock isAuthenticated={true} />, {
      providers: {
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    await user.type(
      screen.getByTestId('newsletter-email-input'),
      'test@test.com'
    )
    // No checkbox is clicked
    await user.click(screen.getByTestId('newsletter-submit-button'))

    expect(screen.getByTestId('newsletter-error')).toBeInTheDocument()
  })

  it('should show success message when user has existing subscriptions', async () => {
    // Override the MSW handler to return existing subscriptions
    mswServer.use(
      http.get('*/users/v1/:userId/contact', () => {
        return HttpResponse.json({
          listIds: [LIST_MAIN_NEWSLETTER],
        })
      })
    )

    renderWithWrapper(<NewslettersBlock isAuthenticated={true} />, {
      providers: {
        queryClient: true,
      },
    })

    // Should show success message instead of form
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
  })
})
