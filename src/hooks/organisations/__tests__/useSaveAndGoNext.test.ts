import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { act, renderHook } from '@testing-library/react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
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
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  } as unknown as AppRouterInstance

  const mockCurrentSimulation = generateSimulation({
    id: 'test-simulation-id',
    progression: 0.5,
  })

  const mockSaveSimulation = vi.fn()
  const mockGetLinkToNextInfosPage = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mocks
    vi.mocked(useRouter).mockReturnValue(mockRouter)
    vi.mocked(useCurrentSimulation).mockReturnValue({
      ...mockCurrentSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as unknown as ReturnType<typeof useCurrentSimulation>)
    vi.mocked(useSaveSimulation).mockReturnValue({
      saveSimulation: mockSaveSimulation,
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useSaveSimulation>)
    vi.mocked(useInfosPage).mockReturnValue({
      getLinkToNextInfosPage: mockGetLinkToNextInfosPage,
      getLinkToPrevInfosPage: vi.fn(),
    } as unknown as ReturnType<typeof useInfosPage>)
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
      simulation: expect.objectContaining(mockCurrentSimulation),
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
    const customSimulation = generateSimulation({
      id: 'custom-simulation-id',
      progression: 1,
    })
    vi.mocked(useCurrentSimulation).mockReturnValue({
      ...customSimulation,
      update: vi.fn(),
      updateCurrentSimulation: vi.fn(),
    } as unknown as ReturnType<typeof useCurrentSimulation>)

    const { result } = renderHook(() => useSaveAndGoNext({ curPage }))

    act(() => {
      result.current.setShouldSaveAndGoNext(true)
    })

    // Verify that saveSimulation was called with the custom simulation
    expect(mockSaveSimulation).toHaveBeenCalledWith({
      simulation: expect.objectContaining(customSimulation),
    })
  })
})
