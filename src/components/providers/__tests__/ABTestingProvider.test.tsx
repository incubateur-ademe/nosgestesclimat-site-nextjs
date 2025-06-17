import { trackEvent } from '@/utils/analytics/trackEvent'
import { act, render } from '@testing-library/react'
import {
  AB_TESTS_LABELS,
  ABTestingProvider,
  useABTesting,
} from '../ABTestingProvider'

// Mock des dépendances
jest.mock('@/utils/analytics/trackEvent')
jest.mock('@/constants/tracking/ab-testing', () => ({
  abTestingVisitOriginal: 'abTestingVisitOriginal',
  getAbTestingVisitVariation: (label: string) =>
    `abTestingVisitVariation-${label}`,
}))

// Composant de test pour accéder au contexte
const TestComponent = () => {
  const { abTests } = useABTesting()
  return <div data-testid="test-component">{JSON.stringify(abTests)}</div>
}

describe('ABTestingProvider', () => {
  beforeEach(() => {
    // Reset des mocks
    jest.clearAllMocks()

    // Mock de window._paq
    window._paq = []

    // Mock de process.env
    process.env.NEXT_PUBLIC_MATOMO_ID = '2'
  })

  afterEach(() => {
    // Cleanup
    window._paq = []
    process.env.NEXT_PUBLIC_MATOMO_ID = undefined
  })

  it('should initialize with empty abTests', () => {
    const { getByTestId } = render(
      <ABTestingProvider>
        <TestComponent />
      </ABTestingProvider>
    )

    expect(getByTestId('test-component').textContent).toBe('{}')
  })

  it('should not initialize AB testing when Matomo is not enabled', () => {
    process.env.NEXT_PUBLIC_MATOMO_ID = '3'

    render(
      <ABTestingProvider>
        <TestComponent />
      </ABTestingProvider>
    )

    expect(window._paq).toEqual([])
  })

  it('should initialize AB testing when Matomo is enabled', () => {
    render(
      <ABTestingProvider>
        <TestComponent />
      </ABTestingProvider>
    )

    expect(window._paq.length).toBeGreaterThan(0)
    expect(window._paq[0][0]).toBe('AbTesting::create')
  })

  it('should track original version when activated', () => {
    render(
      <ABTestingProvider>
        <TestComponent />
      </ABTestingProvider>
    )

    // Simuler l'activation de la version originale
    const originalActivate = window._paq[0][1].variations[0].activate
    act(() => {
      originalActivate({})
    })

    expect(trackEvent).toHaveBeenCalledWith('abTestingVisitOriginal')
  })

  it('should track variation version and update abTests when activated', () => {
    const { getByTestId } = render(
      <ABTestingProvider>
        <TestComponent />
      </ABTestingProvider>
    )

    // Simuler l'activation de la variation
    const variationActivate = window._paq[0][1].variations[1].activate
    act(() => {
      variationActivate({})
    })

    expect(trackEvent).toHaveBeenCalledWith(
      `abTestingVisitVariation-${AB_TESTS_LABELS.hideTutorial}`
    )
    expect(getByTestId('test-component').textContent).toBe(
      JSON.stringify({ [AB_TESTS_LABELS.hideTutorial]: true })
    )
  })
})
