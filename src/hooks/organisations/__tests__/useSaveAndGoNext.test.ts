import { useCurrentSimulation } from '@/publicodes-state'
import { act, renderHook } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { vi } from 'vitest'
import { useInfosPage } from '../../navigation/useInfosPage'
import { useSaveSimulation } from '../../simulation/useSaveSimulation'
import { useSaveAndGoNext } from '../useSaveAndGoNext'

vi.mock('@/publicodes-state', () => ({
  useCurrentSimulation: vi.fn(),
}))

vi.mock('../../navigation/useInfosPage', () => ({
  useInfosPage: vi.fn(),
}))

vi.mock('../../simulation/useSaveSimulation', () => ({
  useSaveSimulation: vi.fn(),
}))

describe('useSaveAndGoNext', () => {
  // Mocks
  const mockRouter = {
    push: vi.fn(),
  }

  const mockCurrentSimulation = {
    id: 'test-simulation-id',
    date: new Date(),
    situation: {},
    foldedSteps: [],
    actionChoices: {},
    computedResults: {},
    progression: 0.5,
  }

  const mockSaveSimulation = vi.fn()
  const mockGetLinkToNextInfosPage = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mocks
    ;(useRouter as any).mockReturnValue(mockRouter)
    ;(useCurrentSimulation as any).mockReturnValue(mockCurrentSimulation)
    ;(useSaveSimulation as any).mockReturnValue({
      saveSimulation: mockSaveSimulation,
    })
    ;(useInfosPage as any).mockReturnValue({
      getLinkToNextInfosPage: mockGetLinkToNextInfosPage,
    })
  })

  it('should return correct default values', () => {
    const { result } = renderHook(() =>
      useSaveAndGoNext({ curPage: 'test-page' })
    )

    expect(result.current.setShouldSaveAndGoNext).toBeInstanceOf(Function)
    expect(result.current.errorSaveSimulation).toBe(false)
  })

  it('should save simulation and navigate to next page when shouldSaveAndGoNext is true', () => {
    const curPage = 'test-page'
    const nextPageLink = '/next-page'

    mockGetLinkToNextInfosPage.mockReturnValue(nextPageLink)

    const { result } = renderHook(() => useSaveAndGoNext({ curPage }))

    act(() => {
      result.current.setShouldSaveAndGoNext(true)
    })

    // Verify that saveSimulation was called with correct parameters
    expect(mockSaveSimulation).toHaveBeenCalledWith({
      simulation: mockCurrentSimulation,
    })

    // Verify that getLinkToNextInfosPage was called with the correct page
    expect(mockGetLinkToNextInfosPage).toHaveBeenCalledWith({ curPage })

    // Verify that router.push was called with the correct link
    expect(mockRouter.push).toHaveBeenCalledWith(nextPageLink)
  })

  it('should handle errors during save operation', () => {
    const curPage = 'test-page'

    // Simulate an error during save
    mockSaveSimulation.mockImplementation(() => {
      throw new Error('Save failed')
    })

    const { result } = renderHook(() => useSaveAndGoNext({ curPage }))

    act(() => {
      result.current.setShouldSaveAndGoNext(true)
    })

    // Verify that error is handled
    expect(result.current.errorSaveSimulation).toBe(true)

    // Verify that navigation did not occur due to error
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('should not execute logic if shouldSaveAndGoNext is false', () => {
    const curPage = 'test-page'

    renderHook(() => useSaveAndGoNext({ curPage }))

    // Don't call setShouldSaveAndGoNext(true)
    // Verify that nothing is called
    expect(mockSaveSimulation).not.toHaveBeenCalled()
    expect(mockGetLinkToNextInfosPage).not.toHaveBeenCalled()
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('should use current simulation for save operation', () => {
    const curPage = 'test-page'
    const customSimulation = {
      ...mockCurrentSimulation,
      id: 'custom-simulation-id',
      progression: 1,
    }
    ;(useCurrentSimulation as any).mockReturnValue(customSimulation)

    const { result } = renderHook(() => useSaveAndGoNext({ curPage }))

    act(() => {
      result.current.setShouldSaveAndGoNext(true)
    })

    // Verify that saveSimulation was called with the custom simulation
    expect(mockSaveSimulation).toHaveBeenCalledWith({
      simulation: customSimulation,
    })
  })
})
