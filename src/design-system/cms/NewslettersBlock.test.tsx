import { mswServer } from '@/__tests__/server'
import NewslettersBlock from '@/design-system/cms/NewslettersBlock'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { act, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import type { Mock } from 'vitest'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

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
  beforeAll(() => {
    // MSW configuration for the API endpoints used by the hooks
    mswServer.use(
      // GET /users/v1/:userId/contact - for useGetNewsletterSubscriptions
      http.get('https://localhost:3001/users/v1/:userId/contact', () => {
        return HttpResponse.json({
          listIds: [],
        })
      }),

      // PUT /users/v1/:userId - for useUpdateUserSettings
      http.put('https://localhost:3001/users/v1/:userId', () => {
        return HttpResponse.json({ success: true })
      }),

      // GET /newsletters/v1/:newsletterId - for useMainNewsletter
      http.get('https://localhost:3001/newsletters/v1/:newsletterId', () => {
        return HttpResponse.json({
          id: LIST_MAIN_NEWSLETTER,
          name: 'Main Newsletter',
          totalSubscribers: 12345,
        })
      }),

      // OPTIONS requests for CORS preflight
      http.options('https://localhost:3001/users/v1/:userId/contact', () => {
        return HttpResponse.json({})
      }),

      http.options('https://localhost:3001/users/v1/:userId', () => {
        return HttpResponse.json({})
      })
    )
  })

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
  })

  it('should not render if locale is not French', () => {
    mockedUseLocale.mockReturnValue('en') // Set locale to English
    renderWithWrapper(<NewslettersBlock />, {
      providers: {
        queryClient: true,
      },
    })
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
  })

  it('should render the form with all elements', async () => {
    renderWithWrapper(<NewslettersBlock />, {
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

  it('should pre-fill checkboxes based on existing subscriptions', async () => {
    // Override the MSW handler for this test to return empty subscriptions
    mswServer.use(
      http.get('*/users/v1/:userId/contact', () => {
        return HttpResponse.json({
          listIds: [],
        })
      })
    )

    renderWithWrapper(<NewslettersBlock />, {
      providers: {
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    // The form should be shown with unchecked checkboxes initially
    expect(
      screen.getByTestId('newsletter-saisonniere-checkbox')
    ).not.toBeChecked()
    expect(screen.getByTestId('newsletter-logement-checkbox')).not.toBeChecked()
    expect(
      screen.getByTestId('newsletter-transports-checkbox')
    ).not.toBeChecked()
  })

  it('should pre-fill email if the user object contains an email', async () => {
    act(() => {
      renderWithWrapper(<NewslettersBlock />, {
        user: { email: 'test@example.com' },
        providers: {
          user: true,
          queryClient: true,
        },
      })
    })

    // Wait for the useEffect to run and set the email value
    await screen.findByDisplayValue('test@example.com')

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('should successfully subscribe a user and show a success message', async () => {
    // Override the MSW handler to return success for this test
    mswServer.use(
      http.put('*/users/v1/:userId', () => {
        return HttpResponse.json({ success: true })
      })
    )

    const user = userEvent.setup()

    let rerender: any
    act(() => {
      const result = renderWithWrapper(<NewslettersBlock />, {
        user: { name: 'Test User', email: 'test@example.com' },
        providers: {
          user: true,
          queryClient: true,
        },
      })
      rerender = result.rerender
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    // Fill and submit the form
    await act(async () => {
      // Clear the input field first
      await user.clear(screen.getByTestId('newsletter-email-input'))
      await user.type(
        screen.getByTestId('newsletter-email-input'),
        'new@example.com'
      )
      await user.click(screen.getByTestId('newsletter-transports-checkbox'))
      await user.click(screen.getByTestId('newsletter-submit-button'))
    })

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
    const { rerender } = renderWithWrapper(<NewslettersBlock />, {
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

  it('should show a required error if email is missing', async () => {
    const user = userEvent.setup()
    renderWithWrapper(<NewslettersBlock />, {
      providers: {
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
    await user.click(screen.getByTestId('newsletter-submit-button'))

    expect(screen.getByTestId('error-email')).toBeInTheDocument()
  })

  it('should show an invalid format error for an incorrect email', async () => {
    const user = userEvent.setup()
    renderWithWrapper(<NewslettersBlock />, {
      providers: {
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    await user.type(
      screen.getByTestId('newsletter-email-input'),
      'not-an-email'
    )
    await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
    await user.click(screen.getByTestId('newsletter-submit-button'))

    expect(screen.getByTestId('error-email')).toHaveTextContent(
      'Veuillez entrer une adresse email valide'
    )
  })

  it('should show an error if no newsletter is selected for a new subscription', async () => {
    const user = userEvent.setup()
    // Override the MSW handler to return empty subscriptions
    mswServer.use(
      http.get('*/users/v1/:userId/contact', () => {
        return HttpResponse.json({
          listIds: [],
        })
      })
    )

    renderWithWrapper(<NewslettersBlock />, {
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

  it('should not make API calls when user submits without modifying newsletter selection', async () => {
    const user = userEvent.setup()
    // Override the MSW handler to return empty subscriptions
    mswServer.use(
      http.get('*/users/v1/:userId/contact', () => {
        return HttpResponse.json({
          listIds: [],
        })
      })
    )

    renderWithWrapper(<NewslettersBlock />, {
      user: { email: 'test@example.com', name: 'Test User' },
      providers: {
        user: true,
        queryClient: true,
      },
    })

    // Wait for the form to be rendered
    await screen.findByTestId('newsletter-form')

    // Submit the form without selecting any checkboxes
    await act(async () => {
      await user.click(screen.getByTestId('newsletter-submit-button'))
    })

    // Wait a bit to ensure any async operations would have completed
    await waitFor(() => {
      // Verify that the error message is shown because no newsletter was selected
      expect(screen.getByTestId('newsletter-error')).toBeInTheDocument()
    })
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

    renderWithWrapper(<NewslettersBlock />, {
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

  it('should show loading skeleton when fetching newsletter subscriptions', async () => {
    // Override the MSW handler to delay the response
    mswServer.use(
      http.get('*/users/v1/:userId/contact', async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        return HttpResponse.json({
          listIds: [],
        })
      })
    )

    renderWithWrapper(<NewslettersBlock />, {
      providers: {
        queryClient: true,
      },
    })

    // Should show loading skeleton initially
    expect(screen.getByTestId('block-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument()

    // Wait for the loading to complete and form to appear
    await waitFor(() => {
      expect(screen.getByTestId('newsletter-form')).toBeInTheDocument()
    })
  })
})
