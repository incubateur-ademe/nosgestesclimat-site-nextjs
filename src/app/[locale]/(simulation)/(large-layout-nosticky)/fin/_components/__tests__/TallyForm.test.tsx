import { act, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock environment variable BEFORE importing the component
vi.stubEnv('NEXT_PUBLIC_TALLY_FORM_ID', 'test-form-id')

// Mock useLocale BEFORE importing the component
const mockUseLocale = vi.fn()
vi.mock('@/hooks/useLocale', () => ({
  useLocale: () => mockUseLocale(),
}))

// Mock safeLocalStorage BEFORE importing the component
vi.mock('@/utils/browser/safeLocalStorage', () => ({
  safeLocalStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(), // Added removeItem to fix provider errors
  },
}))

import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import userEvent from '@testing-library/user-event'
import TallyForm from '../TallyForm'

const mockOpenPopup = vi.fn()

describe('TallyForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    // Reset the mock to return 'fr' by default
    mockUseLocale.mockReturnValue('fr')

    // Reset localStorage mocks
    vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)
    vi.mocked(safeLocalStorage.setItem).mockClear()

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
        simulations: [generateSimulation({ id: 'simulation1' })],
      })
    })

    expect(screen.getByTestId('wave-button')).toBeInTheDocument()
  })

  it('should have correct environment variable', () => {
    expect(process.env.NEXT_PUBLIC_TALLY_FORM_ID).toBe('test-form-id')
  })

  it('should open popup when button is clicked and set localStorage', async () => {
    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [generateSimulation({ id: 'simulation1' })],
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

    expect(mockOpenPopup).toHaveBeenCalledWith('test-form-id', {})
    expect(safeLocalStorage.setItem).toHaveBeenCalledWith('tally-seen', 'true')
  })

  it('should automatically open popup after timeout when conditions are met and set localStorage', () => {
    // S'assurer que l'environnement est correctement configuré
    expect(process.env.NEXT_PUBLIC_TALLY_FORM_ID).toBe('test-form-id')

    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [generateSimulation({ id: 'simulation1' })],
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
    expect(mockOpenPopup).toHaveBeenCalledWith('test-form-id', {})
    expect(safeLocalStorage.setItem).toHaveBeenCalledWith('tally-seen', 'true')
  })

  it('should not automatically open popup if user has already seen it', () => {
    // Mock that the user has already seen the popup
    vi.mocked(safeLocalStorage.getItem).mockReturnValue('true')

    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [generateSimulation({ id: 'simulation1' })],
      })
    })

    // Advance timers to trigger the automatic popup
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    // The popup should not be called because user has already seen it
    expect(mockOpenPopup).not.toHaveBeenCalled()
  })

  it('should still allow manual popup opening even if user has seen it before', async () => {
    // Mock that the user has already seen the popup
    vi.mocked(safeLocalStorage.getItem).mockReturnValue('true')

    act(() => {
      renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [generateSimulation({ id: 'simulation1' })],
      })
    })

    // Clear the mock to reset the call count
    mockOpenPopup.mockClear()
    vi.mocked(safeLocalStorage.setItem).mockClear()

    // The button should still be present
    const button = screen.getByTestId('wave-button')

    // Désactiver temporairement les fake timers pour le clic
    vi.useRealTimers()

    await act(async () => {
      await userEvent.click(button)
    })

    // Réactiver les fake timers
    vi.useFakeTimers()

    // Manual click should still work
    expect(mockOpenPopup).toHaveBeenCalledWith('test-form-id', {})
    expect(safeLocalStorage.setItem).toHaveBeenCalledWith('tally-seen', 'true')
  })

  it('should not render when locale is not French', () => {
    // Changer la valeur retournée par useLocale pour ce test
    mockUseLocale.mockReturnValue('en')

    let container: HTMLElement | null = null

    act(() => {
      const result = renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [generateSimulation({ id: 'simulation1' })],
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

    let container: HTMLElement | null = null

    act(() => {
      const result = renderWithWrapper(<TallyForm />, {
        providers: {
          user: true,
          queryClient: true,
          errorBoundary: true,
        },
        simulations: [generateSimulation({ id: 'simulation1' })],
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
