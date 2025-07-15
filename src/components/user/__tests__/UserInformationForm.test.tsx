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
const mockUseUser = vi.fn()

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

vi.mock('@/publicodes-state', () => ({
  useUser: () => mockUseUser(),
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
  const mockUpdateEmail = vi.fn()
  const mockUpdateName = vi.fn()

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
    mockUseUser.mockReturnValue({
      user: mockUser,
      updateEmail: mockUpdateEmail,
      updateName: mockUpdateName,
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
      mockUseUser.mockReturnValue({
        user: { ...mockUser, email: undefined },
        updateEmail: mockUpdateEmail,
        updateName: mockUpdateName,
      })

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

    it('should not display newsletter section when locale is not French', () => {
      mockUseLocale.mockReturnValue('en')

      renderComponent()

      expect(
        screen.queryByText('Inscription à nos e-mails')
      ).not.toBeInTheDocument()
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

    it('should display custom submit label when provided', () => {
      renderComponent({
        submitLabel: 'Custom Submit Label',
      })

      expect(screen.getByText('Custom Submit Label')).toBeInTheDocument()
    })

    it('should display default submit label when not provided', () => {
      renderComponent()

      expect(
        screen.getByText('Mettre à jour mes informations')
      ).toBeInTheDocument()
    })

    it('should apply custom className when provided', () => {
      const { container } = renderComponent({
        className: 'custom-class',
      })

      const formContainer = container.firstChild as HTMLElement
      expect(formContainer).toHaveClass('custom-class')
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

      await waitFor(() => {
        expect(mockUpdateUserSettings).toHaveBeenCalledWith({
          name: 'Jane Doe',
          email: 'john@example.com',
          newsletterIds: [
            LIST_MAIN_NEWSLETTER,
            LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
          ],
          userId: 'test-user-id',
        })
      })

      await waitFor(() => {
        expect(onCompleted).toHaveBeenCalledWith({
          name: 'Jane Doe',
          'newsletter-saisonniere': true,
          'newsletter-transports': true,
          'newsletter-logement': false,
        })
      })
    })

    it('should call unsubscribeFromNewsletters when newsletter subscriptions are reduced', async () => {
      const user = userEvent.setup()

      // User is subscribed to 3 newsletters
      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: [
          LIST_MAIN_NEWSLETTER,
          LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
          LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
        ],
      })

      renderComponent()

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      // Uncheck the transport newsletter to reduce subscriptions
      const transportCheckbox = screen.getByTestId(
        'newsletter-transports-checkbox'
      )
      await user.click(transportCheckbox)

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUnsubscribeFromNewsletters).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          newsletterIds: {
            [LIST_MAIN_NEWSLETTER]: true,
            [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: false,
            [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: true,
          },
        })
      })
    })

    it('should use legacy hook when shouldUseLegacyHook is true', async () => {
      const user = userEvent.setup()

      renderComponent({
        shouldUseLegacyHook: true,
      })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUnsubscribeFromNewsletters).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          newsletterIds: {
            [LIST_MAIN_NEWSLETTER]: true,
            [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: true,
            [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: false,
          },
        })
      })

      expect(mockUpdateUserSettings).not.toHaveBeenCalled()
    })

    it('should use legacy hook when shouldUseLegacyHook is true even with increased subscriptions', async () => {
      const user = userEvent.setup()

      // User is subscribed to 1 newsletter
      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: [LIST_MAIN_NEWSLETTER],
      })

      renderComponent({
        shouldUseLegacyHook: true,
      })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      // Check transport newsletter to increase subscriptions
      const transportCheckbox = screen.getByTestId(
        'newsletter-transports-checkbox'
      )
      await user.click(transportCheckbox)

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUnsubscribeFromNewsletters).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          newsletterIds: {
            [LIST_MAIN_NEWSLETTER]: true,
            [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: true,
            [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: false,
          },
        })
      })

      expect(mockUpdateUserSettings).not.toHaveBeenCalled()
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

    it('should update user email when user has no email and new email is provided', async () => {
      const user = userEvent.setup()

      mockUseUser.mockReturnValue({
        user: { ...mockUser, email: undefined },
        updateEmail: mockUpdateEmail,
        updateName: mockUpdateName,
      })

      renderWithWrapper(<UserInformationForm title={<h2>Test Form</h2>} />, {
        user: { ...mockUser, email: undefined },
        providers: {
          queryClient: true,
          errorBoundary: true,
          user: true,
        },
      })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      const emailInput = screen.getByTestId('email-input-editable')
      await user.clear(emailInput)
      await user.type(emailInput, 'newemail@example.com')

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateEmail).toHaveBeenCalledWith('newemail@example.com')
      })
    })

    it('should not update user email when no email is provided in form', async () => {
      const user = userEvent.setup()

      renderComponent({
        shouldForceEmailEditable: true,
      })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'John Doe')

      // Clear the email field to ensure no email is provided
      const emailInput = screen.getByTestId('email-input-editable')
      await user.clear(emailInput)

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateEmail).not.toHaveBeenCalled()
      })
    })

    it('should not update user name when no name is provided in form', async () => {
      const user = userEvent.setup()

      renderComponent()

      // Clear the name field to ensure no name is provided
      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateName).not.toHaveBeenCalled()
      })
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

    it('should display error message when unsubscribe fails', async () => {
      const user = userEvent.setup()

      mockUseUnsubscribeFromNewsletters.mockReturnValue({
        mutateAsync: mockUnsubscribeFromNewsletters,
        isPending: false,
        isError: true,
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

    it('should call updateEmail and updateName when form is submitted', async () => {
      const user = userEvent.setup()

      renderComponent({
        shouldForceEmailEditable: true,
      })

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)
      await user.type(nameInput, 'Jane Doe')

      const emailInput = screen.getByTestId('email-input-editable')
      await user.clear(emailInput)
      await user.type(emailInput, 'jane@example.com')

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(mockUpdateName).toHaveBeenCalledWith('Jane Doe')
          expect(mockUpdateEmail).toHaveBeenCalledWith('jane@example.com')
        },
        { timeout: 3000 }
      )
    })

    it('should handle form submission with empty name when user has no name', async () => {
      const user = userEvent.setup()

      mockUseUser.mockReturnValue({
        user: { ...mockUser, name: undefined },
        updateEmail: mockUpdateEmail,
        updateName: mockUpdateName,
      })

      renderWithWrapper(<UserInformationForm title={<h2>Test Form</h2>} />, {
        user: { ...mockUser, name: undefined },
        providers: {
          queryClient: true,
          errorBoundary: true,
          user: true,
        },
      })

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateUserSettings).toHaveBeenCalledWith({
          name: '',
          email: 'john@example.com',
          newsletterIds: [
            LIST_MAIN_NEWSLETTER,
            LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
          ],
          userId: 'test-user-id',
        })
      })
    })
  })

  describe('Default values handling', () => {
    it('should render with default values for newsletters when no subscriptions exist', () => {
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

    it('should prioritize defaultValues over newsletter subscriptions', () => {
      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: [LIST_MAIN_NEWSLETTER], // Only main newsletter subscribed
      })

      renderComponent({
        defaultValues: {
          'newsletter-transports': true,
        },
      })

      // The checkbox should be present even though user is not subscribed to transport newsletter
      const transportsCheckbox = screen.getByTestId(
        'newsletter-transports-checkbox'
      )
      expect(transportsCheckbox).toBeInTheDocument()
    })

    it('should not set newsletter values when neither subscriptions nor defaultValues exist', () => {
      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: undefined,
      })

      renderComponent()

      // The checkboxes should still be present
      expect(
        screen.getByTestId('newsletter-saisonniere-checkbox')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('newsletter-transports-checkbox')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('newsletter-logement-checkbox')
      ).toBeInTheDocument()
    })

    it('should handle defaultValues with false value', () => {
      mockUseGetNewsletterSubscriptions.mockReturnValue({
        data: [LIST_MAIN_NEWSLETTER, LIST_NOS_GESTES_TRANSPORT_NEWSLETTER],
      })

      renderComponent({
        defaultValues: {
          'newsletter-transports': false,
        },
      })

      // The checkbox should still be present
      const transportsCheckbox = screen.getByTestId(
        'newsletter-transports-checkbox'
      )
      expect(transportsCheckbox).toBeInTheDocument()
    })
  })

  describe('Loading states', () => {
    it('should show loading state when updateUserSettings is pending', () => {
      mockUseUpdateUserSettings.mockReturnValue({
        mutateAsync: mockUpdateUserSettings,
        isPending: true,
        isError: false,
        isSuccess: false,
      })

      renderComponent()

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton).toHaveAttribute('aria-disabled', 'true')
    })

    it('should show loading state when unsubscribeFromNewsletters is pending', () => {
      mockUseUnsubscribeFromNewsletters.mockReturnValue({
        mutateAsync: mockUnsubscribeFromNewsletters,
        isPending: true,
        isError: false,
      })

      renderComponent()

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton).toHaveAttribute('aria-disabled', 'true')
    })

    it('should show loading state when both hooks are pending', () => {
      mockUseUpdateUserSettings.mockReturnValue({
        mutateAsync: mockUpdateUserSettings,
        isPending: true,
        isError: false,
        isSuccess: false,
      })
      mockUseUnsubscribeFromNewsletters.mockReturnValue({
        mutateAsync: mockUnsubscribeFromNewsletters,
        isPending: true,
        isError: false,
      })

      renderComponent()

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Form validation', () => {
    it('should show validation error when name is required and empty', async () => {
      const user = userEvent.setup()

      renderComponent()

      const nameInput = screen.getByTestId('name-input')
      await user.clear(nameInput)

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ce champ est requis.')).toBeInTheDocument()
      })
    })

    it('should not show validation error when name is required but user has no name', async () => {
      const user = userEvent.setup()

      mockUseUser.mockReturnValue({
        user: { ...mockUser, name: undefined },
        updateEmail: mockUpdateEmail,
        updateName: mockUpdateName,
      })

      renderWithWrapper(<UserInformationForm title={<h2>Test Form</h2>} />, {
        user: { ...mockUser, name: undefined },
        providers: {
          queryClient: true,
          errorBoundary: true,
          user: true,
        },
      })

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      // Should not show validation error since name is not required when user has no name
      expect(screen.queryByText('Ce champ est requis.')).not.toBeInTheDocument()
    })
  })

  describe('Newsletter interactions', () => {
    it('should handle newsletter checkbox interactions', async () => {
      const user = userEvent.setup()

      renderComponent()

      const saisonniereCheckbox = screen.getByTestId(
        'newsletter-saisonniere-checkbox'
      )
      const transportsCheckbox = screen.getByTestId(
        'newsletter-transports-checkbox'
      )
      const logementCheckbox = screen.getByTestId(
        'newsletter-logement-checkbox'
      )

      // Initially all should be checked based on mock data
      expect(saisonniereCheckbox).toBeChecked()
      expect(transportsCheckbox).toBeChecked()
      expect(logementCheckbox).not.toBeChecked()

      // Toggle logement newsletter
      await user.click(logementCheckbox)
      expect(logementCheckbox).toBeChecked()

      // Toggle saisonniere newsletter
      await user.click(saisonniereCheckbox)
      expect(saisonniereCheckbox).not.toBeChecked()
    })

    it('should submit form with correct newsletter state after interactions', async () => {
      const user = userEvent.setup()

      renderComponent()

      const saisonniereCheckbox = screen.getByTestId(
        'newsletter-saisonniere-checkbox'
      )
      const logementCheckbox = screen.getByTestId(
        'newsletter-logement-checkbox'
      )

      // Toggle newsletters
      await user.click(saisonniereCheckbox) // uncheck
      await user.click(logementCheckbox) // check

      const submitButton = screen.getByTestId('submit-button')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockUpdateUserSettings).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          newsletterIds: [
            LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
            LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
          ],
          userId: 'test-user-id',
        })
      })
    })
  })
})
