import { act, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock environment variable BEFORE importing the component
vi.stubEnv('NEXT_PUBLIC_TALLY_FORM_ID', 'test-form-id')

// Mock useLocale BEFORE importing the component
const mockUseLocale = vi.fn()
vi.mock('@/hooks/useLocale', () => ({
  useLocale: () => mockUseLocale(),
}))

import { renderWithWrapper } from '@/helpers/tests/wrapper'
import userEvent from '@testing-library/user-event'
import TallyForm from '../TallyForm'

const mockOpenPopup = vi.fn()

describe('TallyForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    // Reset the mock to return 'fr' by default
    mockUseLocale.mockReturnValue('fr')

    // Mock window.Tally
    Object.defineProperty(window, 'Tally', {
      value: {
        openPopup: mockOpenPopup,
      },
      writable: true,
    })
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.clearAllMocks()
  })

  it('should render correctly when conditions are met', () => {
    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [{ id: 'simulation1' } as any],
      })
    })

    expect(screen.getByTestId('wave-button')).toBeInTheDocument()
  })

  it('should have correct environment variable', () => {
    expect(process.env.NEXT_PUBLIC_TALLY_FORM_ID).toBe('test-form-id')
  })

  it('should open popup when button is clicked', async () => {
    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [{ id: 'simulation1' } as any],
      })
    })

    // Wait for the automatic timeout to complete first
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    // Clear the mock to reset the call count
    mockOpenPopup.mockClear()

    const button = screen.getByTestId('wave-button')

    // Désactiver temporairement les fake timers pour le clic
    vi.useRealTimers()

    await userEvent.click(button)

    // Réactiver les fake timers
    vi.useFakeTimers()

    expect(mockOpenPopup).toHaveBeenCalled()
  })

  it('should automatically open popup after timeout when conditions are met', () => {
    // S'assurer que l'environnement est correctement configuré
    expect(process.env.NEXT_PUBLIC_TALLY_FORM_ID).toBe('test-form-id')

    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [{ id: 'simulation1' } as any],
      })
    })

    // Initially, the popup should not be called
    expect(mockOpenPopup).not.toHaveBeenCalled()

    // After the timeout, the popup should be called automatically
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    // S'assurer que tous les timers en attente sont exécutés
    act(() => {
      vi.runOnlyPendingTimers()
    })

    // Vérifier que le popup a été appelé avec les bons paramètres
    expect(mockOpenPopup).toHaveBeenCalledWith('test-form-id', {
      emoji: {
        text: '👋',
        animation: 'wave',
      },
    })
  })

  it('should not render when locale is not French', () => {
    // Changer la valeur retournée par useLocale pour ce test
    mockUseLocale.mockReturnValue('en')

    let container: any

    act(() => {
      const result = renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [{ id: 'simulation1' } as any],
      })
      container = result.container
    })

    // Avancer les timers pour s'assurer que tous les effets sont terminés
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should not render when no form ID is set', () => {
    // Temporarily remove the environment variable for this test
    vi.stubEnv('NEXT_PUBLIC_TALLY_FORM_ID', '')

    let container: any

    act(() => {
      const result = renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [{ id: 'simulation1' } as any],
      })
      container = result.container
    })

    // Avancer les timers pour s'assurer que tous les effets sont terminés
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(container).toBeEmptyDOMElement()
  })
})
