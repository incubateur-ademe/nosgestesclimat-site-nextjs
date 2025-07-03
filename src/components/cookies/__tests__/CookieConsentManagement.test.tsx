import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CookieConsentManagement from '../CookieConsentManagement'

// Mock Modal component
jest.mock('@/design-system/modals/Modal', () => {
  return function MockModal({
    isOpen,
    closeModal,
    children,
    hasAbortCross,
    hasAbortButton,
    className,
  }: {
    isOpen: boolean
    closeModal: () => void
    children: React.ReactNode
    hasAbortCross?: boolean
    hasAbortButton?: boolean
    className?: string
  }) {
    if (!isOpen) return null
    return (
      <div data-testid="modal" className={className}>
        {hasAbortCross && (
          <button onClick={closeModal} data-testid="close-button">
            ×
          </button>
        )}
        {children}
      </div>
    )
  }
})

describe('CookieConsentManagement', () => {
  const defaultProps = {
    isBoardOpen: true,
    closeSettings: jest.fn(),
    refuseAll: jest.fn(),
    acceptAll: jest.fn(),
    confirmChoices: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render when board is open', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('modal')).toBeTruthy()
    expect(screen.getByTestId('cookie-management-title')).toBeTruthy()
  })

  it('should not render when board is not open', () => {
    render(<CookieConsentManagement {...defaultProps} isBoardOpen={false} />)

    expect(screen.queryByTestId('modal')).not.toBeTruthy()
  })

  it('should render the title correctly', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('cookie-management-title')).toBeTruthy()
  })

  it('should render the preferences section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('preferences-text')).toBeTruthy()
    expect(screen.getByTestId('privacy-link')).toBeTruthy()
  })

  it('should render the privacy policy link', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const privacyLink = screen.getByTestId('privacy-link')
    expect(privacyLink).toBeTruthy()
  })

  it('should render the refuse all and accept all buttons', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('refuse-all-button')).toBeTruthy()
    expect(screen.getByTestId('accept-all-button')).toBeTruthy()
  })

  it('should call refuseAll when Tout refuser button is clicked', async () => {
    const user = userEvent.setup()
    const refuseAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} refuseAll={refuseAll} />)

    await user.click(screen.getByTestId('refuse-all-button'))
    expect(refuseAll).toHaveBeenCalledTimes(1)
  })

  it('should call acceptAll when Tout accepter button is clicked', async () => {
    const user = userEvent.setup()
    const acceptAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} acceptAll={acceptAll} />)

    await user.click(screen.getByTestId('accept-all-button'))
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should render required cookies section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('required-cookies-title')).toBeTruthy()
    expect(screen.getByTestId('required-cookies-description')).toBeTruthy()
  })

  it('should render Google Ads section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('google-ads-title')).toBeTruthy()
    expect(screen.getByTestId('google-ads-description')).toBeTruthy()
  })

  it('should render radio buttons for Google Ads', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('google-ads-accept-radio')).toBeTruthy()
    expect(screen.getByTestId('google-ads-refuse-radio')).toBeTruthy()
  })

  it('should have accept radio button checked by default', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByTestId(
      'google-ads-accept-radio'
    ) as HTMLInputElement
    const refuseRadio = screen.getByTestId(
      'google-ads-refuse-radio'
    ) as HTMLInputElement

    expect(acceptRadio.checked).toBe(true)
    expect(refuseRadio.checked).toBe(false)
  })

  it('should allow switching between accept and refuse options', async () => {
    const user = userEvent.setup()
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByTestId(
      'google-ads-accept-radio'
    ) as HTMLInputElement
    const refuseRadio = screen.getByTestId(
      'google-ads-refuse-radio'
    ) as HTMLInputElement

    // Initially accept is checked
    expect(acceptRadio.checked).toBe(true)
    expect(refuseRadio.checked).toBe(false)

    // Click refuse
    await user.click(refuseRadio)
    expect(acceptRadio.checked).toBe(false)
    expect(refuseRadio.checked).toBe(true)

    // Click accept again
    await user.click(acceptRadio)
    expect(acceptRadio.checked).toBe(true)
    expect(refuseRadio.checked).toBe(false)
  })

  it('should render the confirm button', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('confirm-choices-button')).toBeTruthy()
  })

  it('should call confirmChoices with correct data when form is submitted with accept', async () => {
    const user = userEvent.setup()
    const confirmChoices = jest.fn()

    render(
      <CookieConsentManagement
        {...defaultProps}
        confirmChoices={confirmChoices}
      />
    )

    await user.click(screen.getByTestId('confirm-choices-button'))

    expect(confirmChoices).toHaveBeenCalledTimes(1)
    expect(confirmChoices).toHaveBeenCalledWith({
      googleAds: true,
    })
  })

  it('should call confirmChoices with correct data when form is submitted with refuse', async () => {
    const user = userEvent.setup()
    const confirmChoices = jest.fn()

    render(
      <CookieConsentManagement
        {...defaultProps}
        confirmChoices={confirmChoices}
      />
    )

    // Change to refuse
    await user.click(screen.getByTestId('google-ads-refuse-radio'))

    // Submit form
    await user.click(screen.getByTestId('confirm-choices-button'))

    expect(confirmChoices).toHaveBeenCalledTimes(1)
    expect(confirmChoices).toHaveBeenCalledWith({
      googleAds: false,
    })
  })

  it('should call closeSettings when close button is clicked', async () => {
    const user = userEvent.setup()
    const closeSettings = jest.fn()

    render(
      <CookieConsentManagement
        {...defaultProps}
        closeSettings={closeSettings}
      />
    )

    await user.click(screen.getByTestId('close-button'))
    expect(closeSettings).toHaveBeenCalledTimes(1)
  })

  it('should set form value to refuse when refuseAll is called', async () => {
    const user = userEvent.setup()
    const refuseAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} refuseAll={refuseAll} />)

    await user.click(screen.getByTestId('refuse-all-button'))

    const refuseRadio = screen.getByTestId(
      'google-ads-refuse-radio'
    ) as HTMLInputElement
    expect(refuseRadio.checked).toBe(true)
  })

  it('should set form value to accept when acceptAll is called', async () => {
    const user = userEvent.setup()
    const acceptAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} acceptAll={acceptAll} />)

    // First change to refuse
    await user.click(screen.getByTestId('google-ads-refuse-radio'))

    // Then click accept all
    await user.click(screen.getByTestId('accept-all-button'))

    const acceptRadio = screen.getByTestId(
      'google-ads-accept-radio'
    ) as HTMLInputElement
    expect(acceptRadio.checked).toBe(true)
  })

  it('should have required cookies radio buttons disabled', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const obligAcceptRadio = screen.getByTestId(
      'required-accept-radio'
    ) as HTMLInputElement
    const obligRefuseRadio = screen.getByTestId(
      'required-refuse-radio'
    ) as HTMLInputElement

    expect(obligAcceptRadio.disabled).toBe(true)
    expect(obligRefuseRadio.disabled).toBe(true)
  })

  it('should have proper form structure', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const form = screen.getByTestId('cookie-form')
    expect(form).toBeTruthy()
  })

  it('should handle multiple form submissions correctly', async () => {
    const user = userEvent.setup()
    const confirmChoices = jest.fn()

    render(
      <CookieConsentManagement
        {...defaultProps}
        confirmChoices={confirmChoices}
      />
    )

    // Submit form multiple times
    await user.click(screen.getByTestId('confirm-choices-button'))
    await user.click(screen.getByTestId('confirm-choices-button'))
    await user.click(screen.getByTestId('confirm-choices-button'))

    expect(confirmChoices).toHaveBeenCalledTimes(3)
  })

  it('should maintain form state when switching between options', async () => {
    const user = userEvent.setup()
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByTestId(
      'google-ads-accept-radio'
    ) as HTMLInputElement
    const refuseRadio = screen.getByTestId(
      'google-ads-refuse-radio'
    ) as HTMLInputElement

    // Switch to refuse
    await user.click(refuseRadio)
    expect(refuseRadio.checked).toBe(true)

    // Switch back to accept
    await user.click(acceptRadio)
    expect(acceptRadio.checked).toBe(true)

    // Switch to refuse again
    await user.click(refuseRadio)
    expect(refuseRadio.checked).toBe(true)
  })

  it('should handle edge cases with empty functions', async () => {
    const user = userEvent.setup()
    const emptyFunction = () => {}

    render(
      <CookieConsentManagement
        {...defaultProps}
        closeSettings={emptyFunction}
        refuseAll={emptyFunction}
        acceptAll={emptyFunction}
        confirmChoices={emptyFunction}
      />
    )

    // Should not throw errors when clicking buttons with empty functions
    await user.click(screen.getByTestId('refuse-all-button'))
    await user.click(screen.getByTestId('accept-all-button'))
    await user.click(screen.getByTestId('confirm-choices-button'))
    await user.click(screen.getByTestId('close-button'))

    // Should still render correctly
    expect(screen.getByTestId('modal')).toBeTruthy()
  })
})
