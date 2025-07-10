import NewslettersBlock from '@/design-system/cms/NewslettersBlock'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { act, screen, waitFor } from '@testing-library/react'
import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock constants

// Mock custom hooks and modules
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
vi.mock('@/hooks/settings/useGetNewsletterSubscriptions')

import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
vi.mock('@/hooks/settings/useUpdateUserSettings')

import { useUnsubscribeFromNewsletters } from '@/hooks/settings/useUnsubscribeFromNewsletters'
vi.mock('@/hooks/settings/useUnsubscribeFromNewsletters')

import { useMainNewsletter } from '@/hooks/useMainNewsletter'
vi.mock('@/hooks/useMainNewsletter')

import { useClientTranslation } from '@/hooks/useClientTranslation'
vi.mock('@/hooks/useClientTranslation')

import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { useLocale } from '@/hooks/useLocale'
import userEvent from '@testing-library/user-event'
vi.mock('@/hooks/useLocale')

vi.mock('@/i18nConfig', () => ({
  default: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es'],
  },
}))

vi.mock('@/utils/analytics/trackEvent')

// We need to provide a mock for the Trans component for i18n
vi.mock('@/components/translation/trans/TransClient', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Cast mocks to the correct type to allow setting mock values.
const mockedUseGetNewsletterSubscriptions =
  useGetNewsletterSubscriptions as Mock
const mockedUseUpdateUserSettings = useUpdateUserSettings as Mock
const mockedUseUnsubscribeFromNewsletters =
  useUnsubscribeFromNewsletters as Mock
const mockedUseMainNewsletter = useMainNewsletter as Mock
const mockedUseLocale = useLocale as Mock
const mockedUseClientTranslation = useClientTranslation as Mock

describe('NewslettersBlock', () => {
  // Create mock functions for mutations that we can spy on.
  const mockUpdateUserSettings = vi.fn()
  const mockUnsubscribe = vi.fn()

  beforeEach(() => {
    // Reset mocks before each test to ensure isolation.
    vi.clearAllMocks()

    // Setup default mock return values for hooks.
    mockedUseGetNewsletterSubscriptions.mockReturnValue({
      data: [],
    })

    mockedUseUpdateUserSettings.mockReturnValue({
      mutateAsync: mockUpdateUserSettings.mockResolvedValue({}),
      isPending: false,
      isSuccess: false,
      isError: false,
    })

    mockedUseUnsubscribeFromNewsletters.mockReturnValue({
      mutateAsync: mockUnsubscribe.mockResolvedValue({}),
      isPending: false,
      isError: false,
    })

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
    renderWithWrapper(<NewslettersBlock />)
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
  })

  it('should render the form with all elements', () => {
    renderWithWrapper(<NewslettersBlock />)
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

  it('should pre-fill checkboxes based on existing subscriptions', () => {
    mockedUseGetNewsletterSubscriptions.mockReturnValue({
      data: [LIST_MAIN_NEWSLETTER, LIST_NOS_GESTES_LOGEMENT_NEWSLETTER],
    })

    renderWithWrapper(<NewslettersBlock />)

    expect(screen.getByTestId('newsletter-saisonniere-checkbox')).toBeChecked()
    expect(screen.getByTestId('newsletter-logement-checkbox')).toBeChecked()
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
        },
      })
    })

    // Wait for the useEffect to run and set the email value
    await screen.findByDisplayValue('test@example.com')

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('should successfully subscribe a user and show a success message', async () => {
    const user = userEvent.setup()

    let rerender: any
    act(() => {
      const result = renderWithWrapper(<NewslettersBlock />, {
        user: { name: 'Test User', email: 'test@example.com' },
        providers: {
          user: true,
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

    await waitFor(() => {
      // Check if the update function was called with correct data
      expect(mockUpdateUserSettings).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
          name: 'Test User',
          newsletterIds: [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER],
        })
      )
    })

    // Simulate the success state change from the hook
    act(() => {
      mockedUseUpdateUserSettings.mockReturnValue({
        mutateAsync: mockUpdateUserSettings,
        isPending: false,
        isSuccess: true,
        isError: false,
      })
      rerender(<NewslettersBlock />)
    })

    // After success, the success message should be visible and the form hidden
    expect(await screen.findByTestId('success-message')).toBeInTheDocument()
    expect(screen.queryByTestId('newsletter-form')).not.toBeInTheDocument()
  })

  it('should unsubscribe user when all checkboxes are unchecked', async () => {
    const user = userEvent.setup()
    // User starts with one subscription
    mockedUseGetNewsletterSubscriptions.mockReturnValue({
      data: [LIST_MAIN_NEWSLETTER],
    })

    let rerender: any
    act(() => {
      const result = renderWithWrapper(<NewslettersBlock />, {
        user: { email: 'test@example.com', name: 'Test User' },
        providers: {
          user: true,
        },
      })
      rerender = result.rerender
    })

    // Wait for email to be pre-filled to ensure user context is loaded
    await screen.findByDisplayValue('test@example.com')

    // Uncheck the already checked box
    await act(async () => {
      await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
      await user.click(screen.getByTestId('newsletter-submit-button'))
    })

    await waitFor(() => {
      expect(mockUpdateUserSettings).toHaveBeenCalled()
    })

    await waitFor(() => {
      // Expect the unsubscribe function to be called
      expect(mockUnsubscribe).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
        newsletterIds: {
          [LIST_MAIN_NEWSLETTER]: false,
          [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: false,
          [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: false,
        },
      })
    })
  })

  it('should show an error message if subscription fails', async () => {
    const user = userEvent.setup()
    const mutateAsyncMock = vi.fn().mockRejectedValue('Error')
    mockedUseUpdateUserSettings.mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
      isSuccess: false,
      isError: false,
    })

    const { rerender } = renderWithWrapper(<NewslettersBlock />)

    await user.type(
      screen.getByTestId('newsletter-email-input'),
      'test@example.com'
    )
    await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
    await user.click(screen.getByTestId('newsletter-submit-button'))

    await waitFor(() => expect(mutateAsyncMock).toHaveBeenCalled())

    // Simulate error state from the hook
    mockedUseUpdateUserSettings.mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
      isSuccess: false,
      isError: true,
    })
    rerender(<NewslettersBlock />)

    expect(
      await screen.findByTestId('submit-error-message')
    ).toBeInTheDocument()
  })

  // it('should show a required error if email is missing', async () => {
  //   const user = userEvent.setup()
  //   renderWithWrapper(<NewslettersBlock />)

  //   await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
  //   await user.click(screen.getByTestId('newsletter-submit-button'))

  //   expect(await screen.findByTestId('error-message')).toHaveTextContent(
  //     'Veuillez renseigner un email.'
  //   )
  // })

  // it('should show an invalid format error for an incorrect email', async () => {
  //   const user = userEvent.setup()
  //   renderWithWrapper(<NewslettersBlock />)

  //   await user.type(
  //     screen.getByTestId('newsletter-email-input'),
  //     'not-an-email'
  //   )
  //   await user.click(screen.getByTestId('newsletter-saisonniere-checkbox'))
  //   await user.click(screen.getByTestId('newsletter-submit-button'))

  //   expect(await screen.findByTestId('error-message')).toHaveTextContent(
  //     'Veuillez entrer une adresse email valide'
  //   )
  // })

  // it('should show an error if no newsletter is selected for a new subscription', async () => {
  //   const user = userEvent.setup()
  //   // User has no initial subscriptions
  //   mockedUseGetNewsletterSubscriptions.mockReturnValue({
  //     data: [],
  //   })
  //   renderWithWrapper(<NewslettersBlock />)

  //   await user.type(
  //     screen.getByTestId('newsletter-email-input'),
  //     'test@test.com'
  //   )
  //   // No checkbox is clicked
  //   await user.click(screen.getByTestId('newsletter-submit-button'))

  //   expect(await screen.findByTestId('error-message')).toHaveTextContent(
  //     'Veuillez sélectionner au moins une infolettre.'
  //   )
  // })
})
