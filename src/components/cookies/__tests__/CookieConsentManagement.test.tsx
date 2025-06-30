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
    expect(screen.getByText('Panneau de gestion des cookies')).toBeTruthy()
  })

  it('should not render when board is not open', () => {
    render(<CookieConsentManagement {...defaultProps} isBoardOpen={false} />)

    expect(screen.queryByTestId('modal')).not.toBeTruthy()
  })

  it('should render the title correctly', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByText('Panneau de gestion des cookies')).toBeTruthy()
  })

  it('should render the preferences section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByText('Préférences pour tous les services.')).toBeTruthy()
    expect(screen.getByText('Données personnelles et cookies')).toBeTruthy()
  })

  it('should render the privacy policy link', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const privacyLink = screen.getByText('Données personnelles et cookies')
    expect(privacyLink).toBeTruthy()
  })

  it('should render the refuse all and accept all buttons', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByText('Tout refuser')).toBeTruthy()
    expect(screen.getByText('Tout accepter')).toBeTruthy()
  })

  it('should call refuseAll when Tout refuser button is clicked', async () => {
    const user = userEvent.setup()
    const refuseAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} refuseAll={refuseAll} />)

    await user.click(screen.getByText('Tout refuser'))
    expect(refuseAll).toHaveBeenCalledTimes(1)
  })

  it('should call acceptAll when Tout accepter button is clicked', async () => {
    const user = userEvent.setup()
    const acceptAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} acceptAll={acceptAll} />)

    await user.click(screen.getByText('Tout accepter'))
    expect(acceptAll).toHaveBeenCalledTimes(1)
  })

  it('should render required cookies section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByText('Cookies obligatoires')).toBeTruthy()
    expect(
      screen.getByText(
        'Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés.'
      )
    ).toBeTruthy()
  })

  it('should render Google Ads section', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByText('Google Ads')).toBeTruthy()
    expect(
      screen.getByText(
        'Nous utilisons des cookies pour calibrer et nos publicités en ligne.'
      )
    ).toBeTruthy()
  })

  it('should render radio buttons for Google Ads', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    expect(screen.getByDisplayValue('accept')).toBeTruthy()
    expect(screen.getByDisplayValue('refuse')).toBeTruthy()
  })

  it('should have accept radio button checked by default', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByDisplayValue('accept') as HTMLInputElement
    const refuseRadio = screen.getByDisplayValue('refuse') as HTMLInputElement

    expect(acceptRadio.checked).toBe(true)
    expect(refuseRadio.checked).toBe(false)
  })

  it('should allow switching between accept and refuse options', async () => {
    const user = userEvent.setup()
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByDisplayValue('accept') as HTMLInputElement
    const refuseRadio = screen.getByDisplayValue('refuse') as HTMLInputElement

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

    expect(screen.getByText('Confirmer mes choix')).toBeTruthy()
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

    await user.click(screen.getByText('Confirmer mes choix'))

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
    await user.click(screen.getByDisplayValue('refuse'))

    // Submit form
    await user.click(screen.getByText('Confirmer mes choix'))

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

    await user.click(screen.getByText('Tout refuser'))

    const refuseRadio = screen.getByDisplayValue('refuse') as HTMLInputElement
    expect(refuseRadio.checked).toBe(true)
  })

  it('should set form value to accept when acceptAll is called', async () => {
    const user = userEvent.setup()
    const acceptAll = jest.fn()

    render(<CookieConsentManagement {...defaultProps} acceptAll={acceptAll} />)

    // First change to refuse
    await user.click(screen.getByDisplayValue('refuse'))

    // Then click accept all
    await user.click(screen.getByText('Tout accepter'))

    const acceptRadio = screen.getByDisplayValue('accept') as HTMLInputElement
    expect(acceptRadio.checked).toBe(true)
  })

  it('should have required cookies radio buttons disabled', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const requiredAcceptRadio = screen.getByDisplayValue(
      'accept'
    ) as HTMLInputElement
    const requiredRefuseRadio = screen.getByDisplayValue(
      'refuse'
    ) as HTMLInputElement

    // Find the required cookies radio buttons by their IDs
    const obligAcceptRadio = document.getElementById(
      'oblig-accept'
    ) as HTMLInputElement
    const obligRefuseRadio = document.getElementById(
      'oblig-refuse'
    ) as HTMLInputElement

    expect(obligAcceptRadio.disabled).toBe(true)
    expect(obligRefuseRadio.disabled).toBe(true)
  })

  it('should have proper form structure', () => {
    render(<CookieConsentManagement {...defaultProps} />)

    const form = document.querySelector('form')
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
    await user.click(screen.getByText('Confirmer mes choix'))
    await user.click(screen.getByText('Confirmer mes choix'))
    await user.click(screen.getByText('Confirmer mes choix'))

    expect(confirmChoices).toHaveBeenCalledTimes(3)
  })

  it('should maintain form state when switching between options', async () => {
    const user = userEvent.setup()
    render(<CookieConsentManagement {...defaultProps} />)

    const acceptRadio = screen.getByDisplayValue('accept') as HTMLInputElement
    const refuseRadio = screen.getByDisplayValue('refuse') as HTMLInputElement

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
    await user.click(screen.getByText('Tout refuser'))
    await user.click(screen.getByText('Tout accepter'))
    await user.click(screen.getByText('Confirmer mes choix'))
    await user.click(screen.getByTestId('close-button'))

    // Should still render correctly
    expect(screen.getByTestId('modal')).toBeTruthy()
  })
})
