import { mswServer } from '@/__tests__/server'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import UserInformationForm from '../UserInformationForm'

// Mock hooks
const mockUseClientTranslation = vi.fn()
const mockUseLocale = vi.fn()
const mockUseGetNewsletterSubscriptions = vi.fn()
const mockUseUpdateUserSettings = vi.fn()
const mockUseUnsubscribeFromNewsletters = vi.fn()

vi.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: () => mockUseClientTranslation(),
}))

vi.mock('@/hooks/useLocale', () => ({
  useLocale: () => mockUseLocale(),
}))

vi.mock('@/hooks/settings/useGetNewsletterSubscriptions', () => ({
  useGetNewsletterSubscriptions: () => mockUseGetNewsletterSubscriptions(),
}))

vi.mock('@/hooks/settings/useUpdateUserSettings', () => ({
  useUpdateUserSettings: () => mockUseUpdateUserSettings(),
}))

vi.mock('@/hooks/settings/useUnsubscribeFromNewsletters', () => ({
  useUnsubscribeFromNewsletters: () => mockUseUnsubscribeFromNewsletters(),
}))

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))

describe('UserInformationForm', () => {
  const mockUser = {
    userId: 'test-user-id',
    name: 'John Doe',
    email: 'john@example.com',
  }

  const mockT = vi.fn((key: string) => key)
  const mockLocale = 'fr'

  const mockUpdateUserSettings = vi.fn()
  const mockUnsubscribeFromNewsletters = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock hooks
    mockUseClientTranslation.mockReturnValue({ t: mockT })
    mockUseLocale.mockReturnValue(mockLocale)
    mockUseGetNewsletterSubscriptions.mockReturnValue({
      data: [LIST_MAIN_NEWSLETTER, LIST_NOS_GESTES_TRANSPORT_NEWSLETTER],
    })
    mockUseUpdateUserSettings.mockReturnValue({
      mutateAsync: mockUpdateUserSettings,
      isPending: false,
      isError: false,
      isSuccess: false,
    })
    mockUseUnsubscribeFromNewsletters.mockReturnValue({
      mutateAsync: mockUnsubscribeFromNewsletters,
      isPending: false,
      isError: false,
    })

    // Mock user functions
    vi.mocked(mockUpdateUserSettings).mockResolvedValue({})
    vi.mocked(mockUnsubscribeFromNewsletters).mockResolvedValue({})
  })

  beforeAll(() => {
    // MSW configuration for used endpoints
    mswServer.use(
      http.put('*/users/v1/:userId', () => {
        return HttpResponse.json({ success: true })
      }),
      http.post('*/update-settings', () => {
        return HttpResponse.json({ success: true })
      })
    )
  })

  const renderComponent = (props = {}) => {
    return renderWithWrapper(
      <UserInformationForm title={<h2>Test Form</h2>} {...props} />,
      {
        user: mockUser,
        providers: {
          queryClient: true,
          errorBoundary: true,
          user: true,
        },
      }
    )
  }

  describe('Component rendering', () => {
    it('should display the form with all default fields', () => {
      renderComponent()

      expect(screen.getByTestId('user-information-form')).toBeInTheDocument()
      expect(screen.getByTestId('name-input')).toBeInTheDocument()
      expect(screen.getByTestId('email-input-readonly')).toBeInTheDocument()
      expect(
        screen.getByTestId('newsletter-saisonniere-checkbox')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('newsletter-transports-checkbox')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('newsletter-logement-checkbox')
      ).toBeInTheDocument()
      expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })

    it('should display only the fields specified in inputsDisplayed', () => {
      renderComponent({
        inputsDisplayed: ['name', 'email'],
      })

      expect(screen.getByTestId('name-input')).toBeInTheDocument()
      expect(screen.getByTestId('email-input-readonly')).toBeInTheDocument()
      expect(
        screen.queryByTestId('newsletter-saisonniere-checkbox')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('newsletter-transports-checkbox')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('newsletter-logement-checkbox')
      ).not.toBeInTheDocument()
    })

    it('should display email field in editable mode when shouldForceEmailEditable is true', () => {
      renderComponent({
        shouldForceEmailEditable: true,
      })

      expect(screen.getByTestId('email-input-editable')).toBeInTheDocument()
      expect(
        screen.queryByTestId('email-input-readonly')
      ).not.toBeInTheDocument()
    })

    it('should display email field in editable mode when user has no email', () => {
      renderWithWrapper(<UserInformationForm title={<h2>Test Form</h2>} />, {
        user: { ...mockUser, email: undefined },
        providers: {
          queryClient: true,
          errorBoundary: true,
          user: true,
        },
      })

      expect(screen.getByTestId('email-input-editable')).toBeInTheDocument()
      expect(
        screen.queryByTestId('email-input-readonly')
      ).not.toBeInTheDocument()
    })
  })

  describe('Form submission', () => {
    it('should submit the form with correct data', async () => {
      const user = userEvent.setup()
      const onCompleted = vi.fn()

      renderComponent({ onCompleted })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'Jane Doe')

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(mockUpdateUserSettings).toHaveBeenCalledWith({
            name: 'Jane Doe',
            email: 'john@example.com',
            newsletterIds: [
              LIST_MAIN_NEWSLETTER,
              LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
            ],
            userId: 'test-user-id',
          })
        },
        { timeout: 3000 }
      )

      // Check that onCompleted is called after timeout
      await waitFor(
        () => {
          expect(onCompleted).toHaveBeenCalledWith({
            name: 'Jane Doe',
            email: '',
            'newsletter-saisonniere': true,
            'newsletter-transports': true,
            'newsletter-logement': false,
          })
        },
        { timeout: 3000 }
      )
    })

    it('should call unsubscribeFromNewsletters when no newsletter is selected', async () => {
      const user = userEvent.setup()

      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: [],
      })

      renderComponent()

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(mockUpdateUserSettings).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            newsletterIds: [],
            userId: 'test-user-id',
          })
          expect(mockUnsubscribeFromNewsletters).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            newsletterIds: {
              [LIST_MAIN_NEWSLETTER]: false,
              [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: false,
              [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: false,
            },
          })
        },
        { timeout: 3000 }
      )
    })

    it('should update user email when shouldForceEmailEditable is true', async () => {
      const user = userEvent.setup()

      renderComponent({
        shouldForceEmailEditable: true,
      })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      const emailInput = screen.getByTestId('email-input-editable')
      const submitButton = screen.getByTestId('submit-button')

      await user.clear(emailInput)
      await user.type(emailInput, 'john@example.com')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(mockUpdateUserSettings).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            newsletterIds: [
              LIST_MAIN_NEWSLETTER,
              LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
            ],
            userId: 'test-user-id',
          })
        },
        { timeout: 3000 }
      )
    })

    it('should display success message after successful submission', async () => {
      const user = userEvent.setup()

      mockUseUpdateUserSettings.mockReturnValue({
        mutateAsync: mockUpdateUserSettings,
        isPending: false,
        isError: false,
        isSuccess: true,
      })

      renderComponent()

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      expect(screen.getByTestId('success-message')).toBeInTheDocument()
    })

    it('should display error message on failure', async () => {
      const user = userEvent.setup()

      mockUseUpdateUserSettings.mockReturnValue({
        mutateAsync: mockUpdateUserSettings,
        isPending: false,
        isError: true,
        isSuccess: false,
      })

      renderComponent()

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('should handle errors gracefully', () => {
      const error = new Error('Test error')

      vi.mocked(mockUpdateUserSettings).mockRejectedValue(error)

      renderComponent()

      // Should render without throwing an error
      expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })
  })

  describe('Default values handling', () => {
    it('should render with default values for newsletters', () => {
      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: [],
      })

      renderComponent({
        defaultValues: {
          'newsletter-transports': true,
        },
      })

      // The checkbox should be present
      const transportsCheckbox = screen.getByTestId(
        'newsletter-transports-checkbox'
      )
      expect(transportsCheckbox).toBeInTheDocument()
    })
  })
})
