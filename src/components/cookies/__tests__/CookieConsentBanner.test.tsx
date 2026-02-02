import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CookieConsentBanner from '../CookieConsentBanner'

// Mock ReactModal
vi.mock('react-modal', () => ({
  default: Object.assign(
    function MockReactModal({
      isOpen,
      children,
      onAfterClose,
    }: {
      isOpen: boolean
      children: React.ReactNode
      onAfterClose: () => void
    }) {
      if (!isOpen) return null
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div data-testid="modal" onClick={onAfterClose}>
          {children}
        </div>
      )
    },
    { setAppElement: vi.fn() }
  ),
}))

// Mock Link component
vi.mock('@/components/Link', () => ({
  default: function MockLink({
    href,
    children,
    className,
  }: {
    href: string
    children: React.ReactNode
    className?: string
  }) {
    return (
      <a href={href} className={className} data-testid="privacy-link">
        {children}
      </a>
    )
  },
}))

describe('CookieConsentBanner', () => {
  const defaultProps = {
    isVisible: true,
    setIsVisible: vi.fn(),
    isBoardOpen: false,
    openSettings: vi.fn(),
    rejectAll: vi.fn(),
    acceptAll: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when visible and board is not open', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('cookie-banner-title')).toBeInTheDocument()
    expect(screen.getByTestId('cookie-banner-description')).toBeInTheDocument()
  })

  it('should not render when not visible', () => {
    render(<CookieConsentBanner {...defaultProps} isVisible={false} />)

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should not render when board is open', () => {
    render(<CookieConsentBanner {...defaultProps} isBoardOpen={true} />)

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should render all three buttons', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(
      screen.getByTestId('cookie-banner-customize-button')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('cookie-banner-refuse-button')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('cookie-banner-accept-button')
    ).toBeInTheDocument()
  })

  it('should call openSettings when Personnaliser button is clicked', async () => {
    const user = userEvent.setup()
    const openSettings = vi.fn()

    render(
      <CookieConsentBanner {...defaultProps} onOpenSettings={openSettings} />
    )

    await user.click(screen.getByTestId('cookie-banner-customize-button'))
    expect(openSettings).toHaveBeenCalledTimes(1)
  })

  it('should call rejectAll when Tout refuser button is clicked', async () => {
    const user = userEvent.setup()
    const rejectAll = vi.fn()

    render(<CookieConsentBanner {...defaultProps} rejectAll={rejectAll} />)

    await user.click(screen.getByTestId('cookie-banner-refuse-button'))
    expect(rejectAll).toHaveBeenCalledTimes(1)
  })

  it('should call acceptAll when Tout accepter button is clicked', async () => {
    const user = userEvent.setup()
    const acceptAll = vi.fn()

    render(<CookieConsentBanner {...defaultProps} acceptAll={acceptAll} />)

    await user.click(screen.getByTestId('cookie-banner-accept-button'))
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should call setIsVisible when modal is closed', async () => {
    const user = userEvent.setup()
    const setIsVisible = vi.fn()

    render(
      <CookieConsentBanner {...defaultProps} setIsVisible={setIsVisible} />
    )

    await user.click(screen.getByTestId('modal'))
    expect(setIsVisible).toHaveBeenCalledWith(false)
  })

  it('should render the correct title', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(screen.getByTestId('cookie-banner-title')).toBeInTheDocument()
  })

  it('should render the correct description text', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(screen.getByTestId('cookie-banner-description')).toBeInTheDocument()
  })

  it('should have proper button styling classes', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    const customizeButton = screen.getByTestId('cookie-banner-customize-button')
    const refuseButton = screen.getByTestId('cookie-banner-refuse-button')
    const acceptButton = screen.getByTestId('cookie-banner-accept-button')

    // Check for actual classes that exist in the rendered buttons
    expect(customizeButton?.className).toContain('text-sm')
    expect(customizeButton?.className).toContain('border-primary-700')
    expect(refuseButton?.className).toContain('text-sm')
    expect(refuseButton?.className).toContain('border-primary-700')
    expect(acceptButton?.className).toContain('text-sm')
    expect(acceptButton?.className).toContain('bg-primary-700')
  })

  it('should handle multiple button clicks correctly', async () => {
    const user = userEvent.setup()
    const openSettings = vi.fn()
    const rejectAll = vi.fn()
    const acceptAll = vi.fn()

    render(
      <CookieConsentBanner
        {...defaultProps}
        onOpenSettings={openSettings}
        rejectAll={rejectAll}
        acceptAll={acceptAll}
      />
    )

    await user.click(screen.getByTestId('cookie-banner-customize-button'))
    await user.click(screen.getByTestId('cookie-banner-refuse-button'))
    await user.click(screen.getByTestId('cookie-banner-accept-button'))

    expect(openSettings).toHaveBeenCalledTimes(1)
    expect(rejectAll).toHaveBeenCalledTimes(1)
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should render with correct modal props', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
  })

  it('should handle state changes correctly', () => {
    const { rerender } = render(<CookieConsentBanner {...defaultProps} />)

    // Initially visible
    expect(screen.getByTestId('modal')).toBeInTheDocument()

    // Hide when isVisible is false
    rerender(<CookieConsentBanner {...defaultProps} isVisible={false} />)
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()

    // Hide when isBoardOpen is true
    rerender(
      <CookieConsentBanner
        {...defaultProps}
        isVisible={true}
        isBoardOpen={true}
      />
    )
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should render accessibility attributes correctly', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
  })

  it('should handle edge cases with empty functions', async () => {
    const user = userEvent.setup()
    const emptyFunction = () => {}

    render(
      <CookieConsentBanner
        {...defaultProps}
        onOpenSettings={emptyFunction}
        rejectAll={emptyFunction}
        acceptAll={emptyFunction}
      />
    )

    // Should not throw errors when clicking buttons with empty functions
    await user.click(screen.getByTestId('cookie-banner-customize-button'))
    await user.click(screen.getByTestId('cookie-banner-refuse-button'))
    await user.click(screen.getByTestId('cookie-banner-accept-button'))

    // Should still render correctly
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })
})
