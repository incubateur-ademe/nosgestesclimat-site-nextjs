import { IframeOptionsProvider } from '@/app/[locale]/_components/mainLayoutProviders/IframeOptionsContext'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import IframeDataShareModal from './IframeDataShareModal'

// Mock des hooks et fonctions
const mockUseIframe = vi.fn()
vi.mock('@/hooks/useIframe', () => ({
  useIframe: () => mockUseIframe(),
}))

const mockGetIsIframe = vi.fn()
vi.mock('@/utils/getIsIframe', () => ({
  getIsIframe: () => mockGetIsIframe(),
}))

// Mock simple pour useClientTranslation
vi.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: () => ({
    t: (key: string) => {
      if (key === 'Partage de vos résultats à {{ parent }} ?') {
        return 'Partage de vos résultats à site parent inconnu ?'
      }
      if (key === 'Accepter') return 'Accepter'
      if (key === 'Refuser') return 'Refuser'
      return key
    },
  }),
}))

// Mock pour useCurrentSimulation et useUser
vi.mock('@/publicodes-state', () => ({
  useCurrentSimulation: () => ({
    computedResults: {
      carbone: {
        bilan: 15000,
        categories: {
          transport: 1000,
          alimentation: 2000,
          logement: 3000,
          divers: 4000,
          'services sociétaux': 5000,
        },
      },
      eau: {
        bilan: 0,
        categories: {
          transport: 0,
          alimentation: 0,
          logement: 0,
          divers: 0,
          'services sociétaux': 0,
        },
      },
    },
  }),
  useUser: () => ({
    user: {
      region: {
        code: 'FR',
      },
    },
  }),
}))

// Wrapper simple pour le test
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <IframeOptionsProvider>{children}</IframeOptionsProvider>
)

describe('IframeDataShareModal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    mockGetIsIframe.mockReturnValue(true)
    mockUseIframe.mockReturnValue({ isIframeShareData: true })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should not render when not in iframe', () => {
    // Given
    mockGetIsIframe.mockReturnValue(false)

    // When
    const { container } = render(
      <TestWrapper>
        <IframeDataShareModal />
      </TestWrapper>
    )

    // Then
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('should not render when iframe share data is disabled', () => {
    // Given
    mockUseIframe.mockReturnValue({ isIframeShareData: false })

    // When
    const { container } = render(
      <TestWrapper>
        <IframeDataShareModal />
      </TestWrapper>
    )

    // Then
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('should show modal after timeout', () => {
    // Given
    render(
      <TestWrapper>
        <IframeDataShareModal />
      </TestWrapper>
    )

    // When
    act(() => {
      vi.advanceTimersByTime(3500)
    })

    // Then
    expect(screen.getByTestId('iframe-datashare-title')).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should send data to parent window when accepting', () => {
    // Given
    const mockPostMessage = vi.fn()
    window.parent.postMessage = mockPostMessage
    render(
      <TestWrapper>
        <IframeDataShareModal />
      </TestWrapper>
    )

    // When
    act(() => {
      vi.advanceTimersByTime(3500)
    })

    // Vérifier que le bouton est bien détecté
    const acceptButton = screen.getByTestId('iframe-datashare-accepter')
    expect(acceptButton).toBeInTheDocument()
    expect(acceptButton).toBeEnabled()

    // Vérifier que le clic fonctionne
    fireEvent.click(acceptButton)

    // Then
    expect(mockPostMessage).toHaveBeenCalled()
    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        messageType: 'ngc-iframe-share',
        data: {
          t: 1000,
          a: 2000,
          l: 3000,
          d: 4000,
          s: 5000,
          footprints: {
            carbon: {
              bilan: 15000,
              categories: {
                transport: 1000,
                alimentation: 2000,
                logement: 3000,
                divers: 4000,
                'services sociétaux': 5000,
              },
            },
            water: {
              bilan: 0,
              categories: {
                transport: 0,
                alimentation: 0,
                logement: 0,
                divers: 0,
                'services sociétaux': 0,
              },
            },
          },
        },
      },
      '*'
    )
  })

  it('should send error message to parent window when rejecting', () => {
    // Given
    const mockPostMessage = vi.fn()
    window.parent.postMessage = mockPostMessage
    render(
      <TestWrapper>
        <IframeDataShareModal />
      </TestWrapper>
    )

    // When
    act(() => {
      vi.advanceTimersByTime(3500)
    })

    fireEvent.click(screen.getByTestId('iframe-datashare-refuser'))

    // Then
    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        messageType: 'ngc-iframe-share',
        error: 'The user refused to share his result.',
      },
      '*'
    )
  })

  it('should reset body overflow when modal is closed', () => {
    // Given
    render(
      <TestWrapper>
        <IframeDataShareModal />
      </TestWrapper>
    )

    // When
    act(() => {
      vi.advanceTimersByTime(3500)
    })

    fireEvent.click(screen.getByText('Accepter'))

    // Then
    expect(document.body.style.overflow).toBe('auto')
  })
})
