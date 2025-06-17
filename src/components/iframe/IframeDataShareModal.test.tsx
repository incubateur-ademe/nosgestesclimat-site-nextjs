import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation } from '@/publicodes-state'
import { getIsIframe } from '@/utils/getIsIframe'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import IframeDataShareModal from './IframeDataShareModal'

// Mock des hooks et fonctions
jest.mock('@/hooks/useIframe', () => ({
  useIframe: jest.fn(),
}))

jest.mock('@/publicodes-state', () => ({
  useCurrentSimulation: jest.fn(),
}))

jest.mock('@/utils/getIsIframe', () => ({
  getIsIframe: jest.fn(),
}))

jest.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: () => ({
    t: (str: string) => str,
  }),
}))

describe('IframeDataShareModal', () => {
  const mockComputedResults = {
    carbone: {
      categories: {
        transport: 1000,
        alimentation: 2000,
        logement: 3000,
        divers: 4000,
        'services sociétaux': 5000,
      },
    },
  }

  beforeEach(() => {
    jest.useFakeTimers()
    ;(getIsIframe as jest.Mock).mockReturnValue(true)
    ;(useIframe as jest.Mock).mockReturnValue({ isIframeShareData: true })
    ;(useCurrentSimulation as jest.Mock).mockReturnValue({
      computedResults: mockComputedResults,
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('should not render when not in iframe', () => {
    // Given
    ;(getIsIframe as jest.Mock).mockReturnValue(false)

    // When
    const { container } = render(<IframeDataShareModal />)

    // Then
    expect(container).toBeEmptyDOMElement()
  })

  it('should not render when iframe share data is disabled', () => {
    // Given
    ;(useIframe as jest.Mock).mockReturnValue({ isIframeShareData: false })

    // When
    const { container } = render(<IframeDataShareModal />)

    // Then
    expect(container).toBeEmptyDOMElement()
  })

  it('should show modal after timeout', () => {
    // Given
    render(<IframeDataShareModal />)

    // When
    act(() => {
      jest.advanceTimersByTime(3500)
    })

    // Then
    expect(screen.getByText(/^Partage de vos résultats/)).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should send data to parent window when accepting', async () => {
    // Given
    const mockPostMessage = jest.fn()
    window.parent.postMessage = mockPostMessage
    render(<IframeDataShareModal />)

    // When
    act(() => {
      jest.advanceTimersByTime(3500)
    })

    // Vérifier que le bouton est bien détecté
    const acceptButton = await screen.findByText('Accepter')
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
        },
      },
      '*'
    )
  })

  it('should send error message to parent window when rejecting', () => {
    // Given
    const mockPostMessage = jest.fn()
    window.parent.postMessage = mockPostMessage
    render(<IframeDataShareModal />)

    // When
    act(() => {
      jest.advanceTimersByTime(3500)
    })

    fireEvent.click(screen.getByText('Refuser'))

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
    render(<IframeDataShareModal />)

    // When
    act(() => {
      jest.advanceTimersByTime(3500)
    })

    fireEvent.click(screen.getByText('Accepter'))

    // Then
    expect(document.body.style.overflow).toBe('auto')
  })
})
