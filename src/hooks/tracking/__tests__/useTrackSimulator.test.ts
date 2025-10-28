import * as saveSimulationModule from '@/helpers/simulation/saveSimulationForTracking'
import { createMockSimulation } from '@/helpers/tests/createMockSimulation'
import * as useGTMModule from '@/hooks/useGTM'
import * as trackEventModule from '@/utils/analytics/trackEvent'
import * as trackGTMEventModule from '@/utils/analytics/trackGTMEvent'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTrackSimulator } from '../useTrackSimulator'
import * as useTrackTimeModule from '../useTrackTimeOnSimulation'
import { setTrackingState } from './helpers/trackingStorage'

// Mock all dependencies
vi.mock('@/utils/analytics/trackEvent')
vi.mock('@/utils/analytics/trackGTMEvent')
vi.mock('@/helpers/simulation/saveSimulationForTracking')
vi.mock('@/hooks/useGTM')
vi.mock('@/hooks/tracking/useTrackTimeOnSimulation')

// Mock Posthog
vi.mock('posthog-js', () => ({
  default: {
    capture: vi.fn(),
  },
}))

// Mock publicodes-state hooks
vi.mock('@/publicodes-state', () => ({
  useCurrentSimulation: vi.fn(),
  useFormState: vi.fn(),
  useEngine: vi.fn(),
  useUser: vi.fn(),
}))

import * as publicodesStateModule from '@/publicodes-state'

describe('useTrackSimulator - Complete Rewrite', () => {
  // Mock functions
  const mockTrackEvent = vi.fn()
  const mockTrackPosthogEvent = vi.fn()
  const mockTrackGTMEvent = vi.fn()
  const mockSaveSimulation = vi.fn()
  const mockTrackTime = vi.fn()
  const mockGetNumericValue = vi.fn()

  // Mock spies
  const mockUseCurrentSimulation = vi.spyOn(
    publicodesStateModule,
    'useCurrentSimulation'
  )
  const mockUseFormState = vi.spyOn(publicodesStateModule, 'useFormState')
  const mockUseUser = vi.spyOn(publicodesStateModule, 'useUser')
  const mockUseEngine = vi.spyOn(publicodesStateModule, 'useEngine')
  const mockUseGTM = vi.spyOn(useGTMModule, 'useGTM')
  const mockUseTrackTime = vi.spyOn(
    useTrackTimeModule,
    'useTrackTimeOnSimulation'
  )

  beforeEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()

    // Setup window globals
    if (typeof window !== 'undefined') {
      window._paq = []
      window.dataLayer = []
      window.gtag = vi.fn()
      window.Matomo = {}
    }

    // Setup tracking spies
    vi.mocked(trackEventModule.trackEvent).mockImplementation(mockTrackEvent)
    vi.mocked(trackEventModule.trackPosthogEvent).mockImplementation(
      mockTrackPosthogEvent
    )
    vi.mocked(trackGTMEventModule.trackGTMEvent).mockImplementation(
      mockTrackGTMEvent
    )
    vi.mocked(saveSimulationModule.saveSimulationForTracking).mockResolvedValue(
      undefined
    )

    // Setup default mock implementations
    mockUseGTM.mockReturnValue({
      isGTMAvailable: true,
      hasConsent: true,
      isGTMLoaded: true,
    })

    mockUseTrackTime.mockReturnValue({
      trackTimeOnSimulation: mockTrackTime.mockReturnValue(5000),
    })

    mockUseUser.mockReturnValue({
      user: { userId: 'test-user-id' },
    } as any)

    mockUseEngine.mockReturnValue({
      getNumericValue: mockGetNumericValue.mockReturnValue(10000),
    } as any)

    mockUseFormState.mockReturnValue({
      isFirstQuestionOfCategory: false,
      isLastQuestionOfCategory: false,
      currentCategory: null,
      relevantAnsweredQuestions: [],
    } as any)

    const defaultSimulation = createMockSimulation({
      progression: 0,
      foldedSteps: [],
    })

    mockUseCurrentSimulation.mockReturnValue({
      ...defaultSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)
  })

  describe('Verify hook execution', () => {
    it('should verify hook mounts without errors', () => {
      const mockSimulation = createMockSimulation({
        id: 'test-sim-1',
        progression: 0,
        foldedSteps: [],
      })

      mockUseCurrentSimulation.mockReturnValue({
        ...mockSimulation,
        update: vi.fn(),
        updateCurrentSimulation: vi.fn(),
      } as any)

      const { result } = renderHook(() => useTrackSimulator())

      // Hook mounts successfully
      expect(result).toBeDefined()
    })

    it('should track simulator_seen event when conditions met', async () => {
      const mockSimulation = createMockSimulation({
        id: 'test-sim-2',
        progression: 0,
        foldedSteps: [],
      })

      mockUseCurrentSimulation.mockReturnValue({
        ...mockSimulation,
        update: vi.fn(),
        updateCurrentSimulation: vi.fn(),
      } as any)

      renderHook(() => useTrackSimulator())

      // Verify tracking is called
      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalled()
      })
    })

    it('should NOT track when already tracked in sessionStorage', async () => {
      const mockSimulation = createMockSimulation({
        id: 'test-sim-3',
        progression: 0,
        foldedSteps: [],
      })

      // Pre-fill sessionStorage
      setTrackingState(mockSimulation.id, 'simulator_seen', true)
      mockUseCurrentSimulation.mockReturnValue({
        ...mockSimulation,
        update: vi.fn(),
        updateCurrentSimulation: vi.fn(),
      } as any)

      renderHook(() => useTrackSimulator())

      // Verify no additional tracking
      await waitFor(
        () => {
          expect(mockTrackEvent).not.toHaveBeenCalled()
        },
        { timeout: 100 }
      )
    })

    it('should track first_question when conditions met', async () => {
      const mockSimulation = createMockSimulation({
        id: 'test-sim-4',
        progression: 0.1,
        foldedSteps: ['question1' as any],
      })

      // Mark simulator_seen as tracked
      setTrackingState(mockSimulation.id, 'simulator_seen', true)
      mockUseCurrentSimulation.mockReturnValue({
        ...mockSimulation,
        update: vi.fn(),
        updateCurrentSimulation: vi.fn(),
      } as any)

      renderHook(() => useTrackSimulator())

      // Verify tracking occurs
      await waitFor(() => {
        expect(mockTrackGTMEvent).toHaveBeenCalled()
      })
    })

    it('should save when progression=1', async () => {
      const mockSimulation = createMockSimulation({
        id: 'test-sim-5',
        progression: 1,
        foldedSteps: ['question1' as any],
      })

      setTrackingState(mockSimulation.id, 'simulator_seen', true)
      setTrackingState(mockSimulation.id, 'first_question', true)
      mockUseCurrentSimulation.mockReturnValue({
        ...mockSimulation,
        update: vi.fn(),
        updateCurrentSimulation: vi.fn(),
      } as any)

      renderHook(() => useTrackSimulator())

      // Verify save is called
      await waitFor(() => {
        expect(
          vi.mocked(saveSimulationModule.saveSimulationForTracking)
        ).toHaveBeenCalled()
      })
    })

    it('should NOT save when groups/polls exist', async () => {
      const mockSimulation = createMockSimulation({
        id: 'test-sim-6',
        progression: 1,
        foldedSteps: ['question1' as any],
        groups: ['group-123'],
      })

      setTrackingState(mockSimulation.id, 'simulator_seen', true)
      setTrackingState(mockSimulation.id, 'first_question', true)
      mockUseCurrentSimulation.mockReturnValue({
        ...mockSimulation,
        update: vi.fn(),
        updateCurrentSimulation: vi.fn(),
      } as any)

      renderHook(() => useTrackSimulator())

      // Verify tracking happens but NOT save
      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalled()
        expect(
          vi.mocked(saveSimulationModule.saveSimulationForTracking)
        ).not.toHaveBeenCalled()
      })
    })
  })

  it('should track simulator_seen event', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-1',
      progression: 0,
      foldedSteps: [],
    })

    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect tracking
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(
        vi.mocked(saveSimulationModule.saveSimulationForTracking)
      ).toHaveBeenCalled()
    })
  })

  it('should NOT track when already tracked', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-2',
      progression: 0,
      foldedSteps: [],
    })

    // Pre-fill sessionStorage
    setTrackingState(mockSimulation.id, 'simulator_seen', true)
    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)

    renderHook(() => useTrackSimulator())

    // Wait a bit to ensure no effects trigger
    await waitFor(
      () => {
        expect(mockTrackEvent).not.toHaveBeenCalled()
      },
      { timeout: 100 }
    )
  })

  it('should track first_question event', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-3',
      progression: 0.1,
      foldedSteps: ['question1' as any],
    })

    // Mark simulator_seen as tracked
    setTrackingState(mockSimulation.id, 'simulator_seen', true)
    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect GTM event to be called
    await waitFor(() => {
      expect(mockTrackGTMEvent).toHaveBeenCalled()
      expect(mockTrackEvent).toHaveBeenCalled()
    })
  })

  it('should NOT call GTM when GTM unavailable', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-4',
      progression: 0.1,
      foldedSteps: ['question1' as any],
    })

    setTrackingState(mockSimulation.id, 'simulator_seen', true)
    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)
    mockUseGTM.mockReturnValue({
      isGTMAvailable: false,
      hasConsent: false,
      isGTMLoaded: false,
    })

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect regular tracking but NO GTM
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(mockTrackGTMEvent).not.toHaveBeenCalled()
    })
  })

  it('should track test_completed event', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-5',
      progression: 1,
      foldedSteps: ['question1' as any],
    })

    setTrackingState(mockSimulation.id, 'simulator_seen', true)
    setTrackingState(mockSimulation.id, 'first_question', true)
    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect completion tracking
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(mockTrackGTMEvent).toHaveBeenCalled()
    })
  })

  it('should NOT save when groups/polls exist', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-6',
      progression: 1,
      foldedSteps: ['question1' as any],
      groups: ['group-123'],
    })

    setTrackingState(mockSimulation.id, 'simulator_seen', true)
    setTrackingState(mockSimulation.id, 'first_question', true)
    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect tracking but NO save
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(
        vi.mocked(saveSimulationModule.saveSimulationForTracking)
      ).not.toHaveBeenCalled()
    })
  })

  it('should track category start', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-7',
      progression: 0,
      foldedSteps: [],
    })

    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)
    mockUseFormState.mockReturnValue({
      isFirstQuestionOfCategory: true,
      isLastQuestionOfCategory: false,
      currentCategory: 'transport',
      relevantAnsweredQuestions: ['question1' as any],
    } as any)

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect category tracking
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
    })
  })

  it('should track category end', async () => {
    const mockSimulation = createMockSimulation({
      id: 'test-sim-pass-8',
      progression: 0.5,
      foldedSteps: ['question1' as any, 'question2' as any],
    })

    mockUseCurrentSimulation.mockReturnValue({
      ...mockSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as any)
    mockUseFormState.mockReturnValue({
      isFirstQuestionOfCategory: false,
      isLastQuestionOfCategory: true,
      currentCategory: 'transport',
      relevantAnsweredQuestions: ['question1' as any, 'question2' as any],
    } as any)

    renderHook(() => useTrackSimulator())

    // Correct assertion: Expect category completion tracking
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
    })
  })
})
