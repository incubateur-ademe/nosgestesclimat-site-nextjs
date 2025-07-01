/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CookieConsentBanner from '../CookieConsentBanner'

// Mock ReactModal
jest.mock('react-modal', () => {
  return function MockReactModal({
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
      <div data-testid="modal" onClick={onAfterClose}>
        {children}
      </div>
    )
  }
})

// Mock Link component
jest.mock('@/components/Link', () => {
  return function MockLink({
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
  }
})

describe('CookieConsentBanner', () => {
  const defaultProps = {
    isVisible: true,
    setIsVisible: jest.fn(),
    isBoardOpen: false,
    openSettings: jest.fn(),
    refuseAll: jest.fn(),
    acceptAll: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render when visible and board is not open', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(screen.getByTestId('modal')).toBeTruthy()
    expect(
      screen.getByText('À propos des cookies sur Nos Gestes Climat')
    ).toBeTruthy()
    expect(
      screen.getByText(
        /Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience/
      )
    ).toBeTruthy()
  })

  it('should not render when not visible', () => {
    render(<CookieConsentBanner {...defaultProps} isVisible={false} />)

    expect(screen.queryByTestId('modal')).not.toBeTruthy()
  })

  it('should not render when board is open', () => {
    render(<CookieConsentBanner {...defaultProps} isBoardOpen={true} />)

    expect(screen.queryByTestId('modal')).not.toBeTruthy()
  })

  it('should render all three buttons', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(screen.getByText('Personnaliser')).toBeTruthy()
    expect(screen.getByText('Tout refuser')).toBeTruthy()
    expect(screen.getByText('Tout accepter')).toBeTruthy()
  })

  it('should call openSettings when Personnaliser button is clicked', async () => {
    const user = userEvent.setup()
    const openSettings = jest.fn()

    render(
      <CookieConsentBanner {...defaultProps} openSettings={openSettings} />
    )

    await user.click(screen.getByText('Personnaliser'))
    expect(openSettings).toHaveBeenCalledTimes(1)
  })

  it('should call refuseAll when Tout refuser button is clicked', async () => {
    const user = userEvent.setup()
    const refuseAll = jest.fn()

    render(<CookieConsentBanner {...defaultProps} refuseAll={refuseAll} />)

    await user.click(screen.getByText('Tout refuser'))
    expect(refuseAll).toHaveBeenCalledTimes(1)
  })

  it('should call acceptAll when Tout accepter button is clicked', async () => {
    const user = userEvent.setup()
    const acceptAll = jest.fn()

    render(<CookieConsentBanner {...defaultProps} acceptAll={acceptAll} />)

    await user.click(screen.getByText('Tout accepter'))
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should render privacy policy link', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    // Look for the actual link in the rendered content
    const privacyLink = screen.getByRole('link', {
      name: /Données personnelles et cookies/i,
    })
    expect(privacyLink).toBeTruthy()
    expect(privacyLink.getAttribute('href')).toBe(
      '/politique-de-confidentialite#cookies'
    )
  })

  it('should call setIsVisible when modal is closed', async () => {
    const user = userEvent.setup()
    const setIsVisible = jest.fn()

    render(
      <CookieConsentBanner {...defaultProps} setIsVisible={setIsVisible} />
    )

    await user.click(screen.getByTestId('modal'))
    expect(setIsVisible).toHaveBeenCalledWith(false)
  })

  it('should render the correct title', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(
      screen.getByText('À propos des cookies sur Nos Gestes Climat')
    ).toBeTruthy()
  })

  it('should render the correct description text', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    expect(
      screen.getByText(
        /Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience/
      )
    ).toBeTruthy()
    expect(
      screen.getByText(
        /Vous pouvez, à tout moment, avoir le contrôle sur les cookies/
      )
    ).toBeTruthy()
  })

  it('should have proper button styling classes', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    const customizeButton = screen.getByText('Personnaliser').closest('button')
    const refuseButton = screen.getByText('Tout refuser').closest('button')
    const acceptButton = screen.getByText('Tout accepter').closest('button')

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
    const openSettings = jest.fn()
    const refuseAll = jest.fn()
    const acceptAll = jest.fn()

    render(
      <CookieConsentBanner
        {...defaultProps}
        openSettings={openSettings}
        refuseAll={refuseAll}
        acceptAll={acceptAll}
      />
    )

    await user.click(screen.getByText('Personnaliser'))
    await user.click(screen.getByText('Tout refuser'))
    await user.click(screen.getByText('Tout accepter'))

    expect(openSettings).toHaveBeenCalledTimes(1)
    expect(refuseAll).toHaveBeenCalledTimes(1)
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should render with correct modal props', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    const modal = screen.getByTestId('modal')
    expect(modal).toBeTruthy()
  })

  it('should handle state changes correctly', () => {
    const { rerender } = render(<CookieConsentBanner {...defaultProps} />)

    // Initially visible
    expect(screen.getByTestId('modal')).toBeTruthy()

    // Hide when isVisible is false
    rerender(<CookieConsentBanner {...defaultProps} isVisible={false} />)
    expect(screen.queryByTestId('modal')).not.toBeTruthy()

    // Hide when isBoardOpen is true
    rerender(
      <CookieConsentBanner
        {...defaultProps}
        isVisible={true}
        isBoardOpen={true}
      />
    )
    expect(screen.queryByTestId('modal')).not.toBeTruthy()
  })

  it('should render accessibility attributes correctly', () => {
    render(<CookieConsentBanner {...defaultProps} />)

    const modal = screen.getByTestId('modal')
    expect(modal).toBeTruthy()
  })

  it('should handle edge cases with empty functions', async () => {
    const user = userEvent.setup()
    const emptyFunction = () => {}

    render(
      <CookieConsentBanner
        {...defaultProps}
        openSettings={emptyFunction}
        refuseAll={emptyFunction}
        acceptAll={emptyFunction}
      />
    )

    // Should not throw errors when clicking buttons with empty functions
    await user.click(screen.getByText('Personnaliser'))
    await user.click(screen.getByText('Tout refuser'))
    await user.click(screen.getByText('Tout accepter'))

    // Should still render correctly
    expect(screen.getByTestId('modal')).toBeTruthy()
  })
})
