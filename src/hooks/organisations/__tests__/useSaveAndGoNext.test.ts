import { useCurrentSimulation } from '@/publicodes-state'
import { act, renderHook } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { useInfosPage } from '../../navigation/useInfosPage'
import { useSaveSimulation } from '../../simulation/useSaveSimulation'
import { useSaveAndGoNext } from '../useSaveAndGoNext'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/publicodes-state', () => ({
  useCurrentSimulation: jest.fn(),
}))

jest.mock('../../navigation/useInfosPage', () => ({
  useInfosPage: jest.fn(),
}))

jest.mock('../../simulation/useSaveSimulation', () => ({
  useSaveSimulation: jest.fn(),
}))

describe('useSaveAndGoNext', () => {
  // Mocks
  const mockRouter = {
    push: jest.fn(),
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

  const mockSaveSimulation = jest.fn()
  const mockGetLinkToNextInfosPage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup default mocks
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useCurrentSimulation as jest.Mock).mockReturnValue(mockCurrentSimulation)
    ;(useSaveSimulation as jest.Mock).mockReturnValue({
      saveSimulation: mockSaveSimulation,
    })
    ;(useInfosPage as jest.Mock).mockReturnValue({
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

    ;(useCurrentSimulation as jest.Mock).mockReturnValue(customSimulation)

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
