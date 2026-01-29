import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CookieConsentManagement from '../CookieConsentManagement'

// Mock Modal component
vi.mock('@/design-system/modals/Modal', () => {
  return {
    default: function MockModal({
      isOpen,
      closeModal,
      children,
      hasAbortCross,
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
        <div data-testid="modal">
          {hasAbortCross && (
            <button onClick={closeModal} data-testid="close-button">
              ×
            </button>
          )}
          {children}
        </div>
      )
    },
  }
})

describe('CookieConsentManagement', () => {
  const defaultProps = {
    isBoardOpen: true,
    closeSettings: vi.fn(),
    refuseAll: vi.fn(),
    acceptAll: vi.fn(),
    confirmChoices: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when board is open', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('cookie-management-title')).toBeInTheDocument()
  })

  it('should not render when board is not open', () => {
    render(<CookieConsentManagement {...defaultProps} isBoardOpen={false} />)

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should render the title correctly', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('cookie-management-title')).toBeInTheDocument()
  })

  it('should render the preferences section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('preferences-text')).toBeInTheDocument()
    expect(screen.getByTestId('privacy-link')).toHaveAttribute(
      'href',
      '/politique-de-confidentialite#cookies'
    )
  })

  it('should render the privacy policy link', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const privacyLink = screen.getByTestId('privacy-link')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute(
      'href',
      '/politique-de-confidentialite#cookies'
    )
  })

  it('should render the refuse all and accept all buttons', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('refuse-all-button')).toBeInTheDocument()
    expect(screen.getByTestId('accept-all-button')).toBeInTheDocument()
  })

  it('should call refuseAll when Tout refuser button is clicked', async () => {
    const user = userEvent.setup()
    const refuseAll = vi.fn()

    render(<CookieConsentManagement {...defaultProps} refuseAll={refuseAll} />)

    await user.click(screen.getByTestId('refuse-all-button'))
    expect(refuseAll).toHaveBeenCalledTimes(1)
  })

  it('should call acceptAll when Tout accepter button is clicked', async () => {
    const user = userEvent.setup()
    const acceptAll = vi.fn()

    render(<CookieConsentManagement {...defaultProps} acceptAll={acceptAll} />)

    await user.click(screen.getByTestId('accept-all-button'))
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should render required cookies section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('required-cookies-title')).toBeInTheDocument()
    expect(
      screen.getByTestId('required-cookies-description')
    ).toBeInTheDocument()
  })

  it('should render Google Ads section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('google-ads-title')).toBeInTheDocument()
    expect(screen.getByTestId('google-ads-description')).toBeInTheDocument()
  })

  it('should render radio buttons for Google Ads', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('google-ads-accept-radio')).toBeInTheDocument()
    expect(screen.getByTestId('google-ads-refuse-radio')).toBeInTheDocument()
  })

  it('should have accept radio button checked by default', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByTestId('google-ads-accept-radio')
    const refuseRadio = screen.getByTestId('google-ads-refuse-radio')

    expect((acceptRadio as HTMLInputElement).checked).toBe(true)
    expect((refuseRadio as HTMLInputElement).checked).toBe(false)
  })

  it('should allow switching between accept and refuse options', async () => {
    const user = userEvent.setup()
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByTestId('google-ads-accept-radio')
    const refuseRadio = screen.getByTestId('google-ads-refuse-radio')

    // Initially accept is checked
    expect((acceptRadio as HTMLInputElement).checked).toBe(true)
    expect((refuseRadio as HTMLInputElement).checked).toBe(false)

    // Click refuse
    await user.click(refuseRadio)
    expect((acceptRadio as HTMLInputElement).checked).toBe(false)
    expect((refuseRadio as HTMLInputElement).checked).toBe(true)

    // Click accept again
    await user.click(acceptRadio)
    expect((acceptRadio as HTMLInputElement).checked).toBe(true)
    expect((refuseRadio as HTMLInputElement).checked).toBe(false)
  })

  it('should render the confirm button', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('confirm-choices-button')).toBeInTheDocument()
  })

  it('should call confirmChoices with correct data when form is submitted with accept', async () => {
    const user = userEvent.setup()
    const confirmChoices = vi.fn()

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
      posthog: true,
    })
  })

  it('should call confirmChoices with correct data when form is submitted with refuse', async () => {
    const user = userEvent.setup()
    const confirmChoices = vi.fn()

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
      posthog: true,
    })
  })

  it('should call closeSettings when close button is clicked', async () => {
    const user = userEvent.setup()
    const closeSettings = vi.fn()

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
    const refuseAll = vi.fn()

    render(<CookieConsentManagement {...defaultProps} refuseAll={refuseAll} />)

    await user.click(screen.getByTestId('refuse-all-button'))

    const refuseRadio = screen.getByTestId('google-ads-refuse-radio')
    expect((refuseRadio as HTMLInputElement).checked).toBe(true)
  })

  it('should set form value to accept when acceptAll is called', async () => {
    const user = userEvent.setup()
    const acceptAll = vi.fn()

    render(<CookieConsentManagement {...defaultProps} acceptAll={acceptAll} />)

    await user.click(screen.getByTestId('accept-all-button'))

    const acceptRadio = screen.getByTestId('google-ads-accept-radio')
    expect((acceptRadio as HTMLInputElement).checked).toBe(true)
  })

  it('should have a close button in the modal', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByTestId('close-button')).toBeInTheDocument()
  })

  it('should pass hasAbortCross as true to Modal', () => {
    const closeSettings = vi.fn()
    const emptyFunction = () => {}
    render(
      <CookieConsentManagement
        isBoardOpen={true}
        closeSettings={closeSettings}
        refuseAll={emptyFunction}
        acceptAll={emptyFunction}
        confirmChoices={emptyFunction}
      />
    )

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  it('should have correct default choices for radio buttons', () => {
    render(
      <CookieConsentManagement
        {...defaultProps}
        choices={{
          googleAds: true,
          posthog: true,
        }}
      />
    )

    const acceptRadio = screen.getByTestId('google-ads-accept-radio')
    const refuseRadio = screen.getByTestId('google-ads-refuse-radio')

    expect((acceptRadio as HTMLInputElement).checked).toBe(true)
    expect((refuseRadio as HTMLInputElement).checked).toBe(false)
  })

  it('should reflect custom choices in radio buttons', () => {
    render(
      <CookieConsentManagement
        {...defaultProps}
        choices={{
          googleAds: false,
          posthog: false,
        }}
      />
    )

    const acceptRadio = screen.getByTestId('google-ads-accept-radio')
    const refuseRadio = screen.getByTestId('google-ads-refuse-radio')

    expect((acceptRadio as HTMLInputElement).checked).toBe(false)
    expect((refuseRadio as HTMLInputElement).checked).toBe(true)
  })
})
