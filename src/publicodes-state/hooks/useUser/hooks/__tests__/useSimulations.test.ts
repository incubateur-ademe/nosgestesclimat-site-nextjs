/**
 * Comprehensive test suite for the useSimulations hook
 *
 * This test file covers all the main functionality of the useSimulations hook:
 * - Simulation initialization (initSimulation)
 * - Simulation deletion (deleteSimulation)
 * - Simulation updates (updateCurrentSimulation)
 * - Current simulation retrieval (currentSimulation)
 * - Memoization behavior
 *
 * The tests follow the Arrange-Act-Assert pattern and include both positive
 * and negative test cases to ensure robust coverage.
 */

import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { faker } from '@faker-js/faker'
import type {
  DottedName,
  ExtendedSituation,
} from '@incubateur-ademe/nosgestesclimat'
import type { Migration } from '@publicodes/tools/migration'
import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import type { Simulation } from '../../../../types'
import useSimulations from '../useSimulations'

// Mock external dependencies to isolate the hook under test
vi.mock('@/helpers/simulation/generateSimulation')
vi.mock('@/utils/browser/safeLocalStorage')

const mockGenerateSimulation = vi.mocked(generateSimulation)
const mockSafeLocalStorage = vi.mocked(safeLocalStorage)

describe('useSimulations', () => {
  // Test data setup - creating mock data for consistent testing
  const mockMigrationInstructions: Migration = {
    version: '1.0.0',
  } as unknown as Migration

  /**
   * Helper function to create mock simulation objects for testing
   * @param overrides - Partial simulation data to override defaults
   * @returns A complete Simulation object with faker-generated data
   */
  const createMockSimulation = (
    overrides: Partial<Simulation> = {}
  ): Simulation => ({
    id: faker.string.uuid(),
    date: new Date(),
    situation: {},
    extendedSituation: {} as ExtendedSituation,
    foldedSteps: [],
    actionChoices: {},
    computedResults: {
      carbone: {
        bilan: 0,
        categories: {} as Record<DottedName, number>,
      },
      eau: {
        bilan: 0,
        categories: {} as Record<DottedName, number>,
      },
    },
    progression: 0,
    ...overrides,
  })

  beforeEach(() => {
    // Clear all mocks before each test to ensure test isolation
    vi.clearAllMocks()

    // Mock generateSimulation to return a predictable simulation object
    // This ensures consistent behavior across tests and allows us to test the hook logic
    mockGenerateSimulation.mockImplementation((params = {}) => ({
      id: params.id || faker.string.uuid(),
      date: params.date || new Date(),
      situation: params.situation || {},
      extendedSituation: params.extendedSituation || ({} as ExtendedSituation),
      foldedSteps: params.foldedSteps || [],
      actionChoices: params.actionChoices || {},
      persona: params.persona,
      computedResults: params.computedResults || {
        carbone: { bilan: 0, categories: {} as Record<DottedName, number> },
        eau: { bilan: 0, categories: {} as Record<DottedName, number> },
      },
      progression: params.progression || 0,
      defaultAdditionalQuestionsAnswers:
        params.defaultAdditionalQuestionsAnswers,
      polls: params.polls,
      groups: params.groups,
      savedViaEmail: params.savedViaEmail,
    }))
  })

  describe('initSimulation', () => {
    it('should initialize a new simulation and add it to simulations list', () => {
      // Arrange: Set up initial state with empty simulations list
      // This tests the basic functionality of creating and adding a new simulation
      const initialSimulations: Simulation[] = []
      const setSimulations = vi.fn()
      const setCurrentSimulationId = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: initialSimulations,
          setSimulations,
          currentSimulationId: '',
          setCurrentSimulationId,
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const simulationData = {
        id: 'test-simulation-id',
        situation: { 'transport . voiture . km': 1000 },
        progression: 0.5,
      }

      // Act: Initialize a new simulation with provided data
      act(() => {
        result.current.initSimulation(simulationData)
      })

      // Assert: Verify that the simulation creation process was triggered correctly
      // The hook should call setSimulations with an update function and setCurrentSimulationId
      expect(setSimulations).toHaveBeenCalledWith(expect.any(Function))
      expect(setCurrentSimulationId).toHaveBeenCalledWith(expect.any(String))

      // Verify that generateSimulation was called with the correct parameters
      expect(mockGenerateSimulation).toHaveBeenCalledWith({
        ...simulationData,
        migrationInstructions: mockMigrationInstructions,
      })
    })

    it('should not add simulation if ID already exists', () => {
      // Arrange: Set up initial state with existing simulation
      const existingSimulation = createMockSimulation({ id: 'existing-id' })
      const initialSimulations = [existingSimulation]
      const setSimulations = vi.fn()
      const setCurrentSimulationId = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: initialSimulations,
          setSimulations,
          currentSimulationId: '',
          setCurrentSimulationId,
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Try to initialize simulation with existing ID
      act(() => {
        result.current.initSimulation({ id: 'existing-id' })
      })

      // Assert: Verify simulation was not added
      expect(setSimulations).toHaveBeenCalledWith(expect.any(Function))

      // Test the function passed to setSimulations to ensure it doesn't add duplicate
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction(initialSimulations)
      expect(resultSimulations).toEqual(initialSimulations)
    })

    it('should call resetAideSaisie when initializing simulation', () => {
      // Arrange
      const setSimulations = vi.fn()
      const setCurrentSimulationId = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [],
          setSimulations,
          currentSimulationId: '',
          setCurrentSimulationId,
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act
      act(() => {
        result.current.initSimulation()
      })

      // Assert: Verify localStorage items were removed
      expect(mockSafeLocalStorage.removeItem).toHaveBeenCalledWith(
        'transport . voiture . km'
      )
      expect(mockSafeLocalStorage.removeItem).toHaveBeenCalledWith(
        'transport . avion . court courrier . heures de vol'
      )
      expect(mockSafeLocalStorage.removeItem).toHaveBeenCalledWith(
        'transport . avion . moyen courrier . heures de vol'
      )
      expect(mockSafeLocalStorage.removeItem).toHaveBeenCalledWith(
        'transport . avion . long courrier . heures de vol'
      )
    })
  })

  describe('deleteSimulation', () => {
    it('should remove simulation from simulations list', () => {
      // Arrange: Set up simulations with multiple items
      const simulation1 = createMockSimulation({ id: 'sim-1' })
      const simulation2 = createMockSimulation({ id: 'sim-2' })
      const simulation3 = createMockSimulation({ id: 'sim-3' })
      const initialSimulations = [simulation1, simulation2, simulation3]
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: initialSimulations,
          setSimulations,
          currentSimulationId: 'sim-2',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Delete simulation with ID 'sim-2'
      act(() => {
        result.current.deleteSimulation('sim-2')
      })

      // Assert: Verify correct simulation was removed
      expect(setSimulations).toHaveBeenCalledWith(expect.any(Function))

      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction(initialSimulations)
      expect(resultSimulations).toEqual([simulation1, simulation3])
    })

    it('should handle deletion of non-existent simulation gracefully', () => {
      // Arrange
      const simulation1 = createMockSimulation({ id: 'sim-1' })
      const initialSimulations = [simulation1]
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: initialSimulations,
          setSimulations,
          currentSimulationId: 'sim-1',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Try to delete non-existent simulation
      act(() => {
        result.current.deleteSimulation('non-existent-id')
      })

      // Assert: Verify simulations list remains unchanged
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction(initialSimulations)
      expect(resultSimulations).toEqual(initialSimulations)
    })
  })

  describe('updateCurrentSimulation', () => {
    it('should handle complex situation updates with added, modified, and removed dottedNames', () => {
      // Arrange: Test complex scenario with multiple changes to situation
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        situation: {
          'transport . voiture . km': 1000,
          'transport . avion . heures de vol': 5,
          'logement . surface': 50,
        } as unknown as Record<DottedName, any>,
        extendedSituation: {
          'transport . voiture . km': {
            source: 'answered',
            nodeValue: 1000,
          },
          'transport . avion . heures de vol': {
            source: 'answered',
            nodeValue: 5,
          },
          'logement . surface': {
            source: 'answered',
            nodeValue: 50,
          },
          // Note: 'alimentation . viande' is NOT in extendedSituation initially
        } as unknown as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // New situation: modified existing, added new, removed one
      const newSituation = {
        'transport . voiture . km': 2000, // Modified
        'logement . surface': 50, // Unchanged
        'alimentation . viande': 10, // Added new - but won't be added to extendedSituation because it wasn't there initially
        // 'transport . avion . heures de vol' is removed
      } as unknown as Record<DottedName, any>

      // Act: Update situation with complex changes
      act(() => {
        result.current.updateCurrentSimulation({ situation: newSituation })
      })

      // Assert: Verify extendedSituation was synchronized correctly
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.situation).toEqual(newSituation)

      // Modified dottedName should be updated
      expect(
        updatedSimulation.extendedSituation['transport . voiture . km']
      ).toEqual({
        source: 'answered',
        nodeValue: 2000,
      })

      // Unchanged dottedName should remain the same
      expect(updatedSimulation.extendedSituation['logement . surface']).toEqual(
        {
          source: 'answered',
          nodeValue: 50,
        }
      )

      // Added dottedName should NOT be added to extendedSituation because it wasn't there initially
      // This is the actual behavior of the hook - it only updates existing keys in extendedSituation
      expect(
        updatedSimulation.extendedSituation['alimentation . viande']
      ).toBeUndefined()

      // Removed dottedName should be marked as omitted
      expect(
        updatedSimulation.extendedSituation['transport . avion . heures de vol']
      ).toEqual({
        source: 'omitted',
      })
    })

    it('should handle situation update with no changes gracefully', () => {
      // Arrange: Test that unchanged situation doesn't cause issues
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        situation: {
          'transport . voiture . km': 1000,
        } as unknown as Record<DottedName, any>,
        extendedSituation: {
          'transport . voiture . km': {
            source: 'answered',
            nodeValue: 1000,
          },
        } as unknown as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Same situation as before
      const sameSituation = {
        'transport . voiture . km': 1000,
      } as unknown as Record<DottedName, any>

      // Act: Update with identical situation
      act(() => {
        result.current.updateCurrentSimulation({ situation: sameSituation })
      })

      // Assert: Verify no unnecessary changes were made
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.situation).toEqual(sameSituation)
      expect(
        updatedSimulation.extendedSituation['transport . voiture . km']
      ).toEqual({
        source: 'answered',
        nodeValue: 1000,
      })
    })

    it('should handle empty situation update correctly', () => {
      // Arrange: Test updating to empty situation
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        situation: {
          'transport . voiture . km': 1000,
          'logement . surface': 50,
        } as unknown as Record<DottedName, any>,
        extendedSituation: {
          'transport . voiture . km': {
            source: 'answered',
            nodeValue: 1000,
          },
          'logement . surface': {
            source: 'answered',
            nodeValue: 50,
          },
        } as unknown as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Empty situation
      const emptySituation = {} as unknown as Record<DottedName, any>

      // Act: Update to empty situation
      act(() => {
        result.current.updateCurrentSimulation({ situation: emptySituation })
      })

      // Assert: Verify all dottedNames are marked as omitted
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.situation).toEqual(emptySituation)
      expect(
        updatedSimulation.extendedSituation['transport . voiture . km']
      ).toEqual({
        source: 'omitted',
      })
      expect(updatedSimulation.extendedSituation['logement . surface']).toEqual(
        {
          source: 'omitted',
        }
      )
    })

    it('should handle foldedSteps updates and sync extendedSituation', () => {
      // Arrange
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: ['transport . voiture', 'transport . avion'],
        extendedSituation: {
          'transport . voiture': { source: 'default', nodeValue: 0 },
          'transport . avion': { source: 'default', nodeValue: 0 },
        } as unknown as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const newFoldedSteps = ['transport . voiture'] as DottedName[]

      // Act: Update foldedSteps
      act(() => {
        result.current.updateCurrentSimulation({ foldedSteps: newFoldedSteps })
      })

      // Assert: Verify foldedSteps and extendedSituation were updated
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.foldedSteps).toEqual(newFoldedSteps)
      expect(updatedSimulation.extendedSituation['transport . avion']).toEqual({
        source: 'omitted',
      })
    })

    it('should add foldedStepToAdd correctly for regular questions', () => {
      // Arrange: Test normal foldedStepToAdd behavior (like Textile component)
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: [],
        extendedSituation: {} as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const foldedStepToAdd = {
        foldedStep: 'divers . textile . volume' as DottedName,
        value: 'minimum',
        isMosaicParent: false,
        isMosaicChild: false,
      }

      // Act: Add folded step (similar to Textile component behavior)
      act(() => {
        result.current.updateCurrentSimulation({ foldedStepToAdd })
      })

      // Assert: Verify folded step was added to both foldedSteps and extendedSituation
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.foldedSteps).toContain(
        'divers . textile . volume'
      )
      expect(
        updatedSimulation.extendedSituation['divers . textile . volume']
      ).toEqual({
        source: 'default',
        nodeValue: 'minimum',
      })
    })

    it('should handle mosaic parent correctly - should not add to extendedSituation', () => {
      // Arrange: Test mosaic parent behavior (like Navigation component)
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: [],
        extendedSituation: {} as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const foldedStepToAdd = {
        foldedStep: 'divers . ameublement . meubles' as DottedName,
        value: 5,
        isMosaicParent: true, // This is a mosaic parent
        isMosaicChild: false,
      }

      // Act: Add mosaic parent folded step
      act(() => {
        result.current.updateCurrentSimulation({ foldedStepToAdd })
      })

      // Assert: Verify folded step was added to foldedSteps but NOT to extendedSituation
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.foldedSteps).toContain(
        'divers . ameublement . meubles'
      )
      // Mosaic parent should NOT be added to extendedSituation
      expect(
        updatedSimulation.extendedSituation['divers . ameublement . meubles']
      ).toBeUndefined()
    })

    it('should handle mosaic child correctly - should not add to foldedSteps but should add to extendedSituation', () => {
      // Arrange: Test mosaic child behavior (like Ameublement component)
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: [],
        extendedSituation: {} as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const foldedStepToAdd = {
        foldedStep: 'divers . ameublement . meubles . canapé' as DottedName,
        value: 1,
        isMosaicParent: false,
        isMosaicChild: true, // This is a mosaic child
      }

      // Act: Add mosaic child folded step
      act(() => {
        result.current.updateCurrentSimulation({ foldedStepToAdd })
      })

      // Assert: Verify mosaic child was added to extendedSituation but NOT to foldedSteps
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      // Mosaic child should NOT be added to foldedSteps
      expect(updatedSimulation.foldedSteps).not.toContain(
        'divers . ameublement . meubles . canapé'
      )
      // But should be added to extendedSituation
      expect(
        updatedSimulation.extendedSituation[
          'divers . ameublement . meubles . canapé'
        ]
      ).toEqual({
        source: 'default',
        nodeValue: 1,
      })
    })

    it('should not add duplicate foldedStep to foldedSteps when already present', () => {
      // Arrange: Test that duplicate foldedSteps are not added
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: ['transport . voiture'], // Already contains this step
        extendedSituation: {} as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const foldedStepToAdd = {
        foldedStep: 'transport . voiture' as DottedName,
        value: 2000,
        isMosaicParent: false,
        isMosaicChild: false,
      }

      // Act: Try to add duplicate folded step
      act(() => {
        result.current.updateCurrentSimulation({ foldedStepToAdd })
      })

      // Assert: Verify folded step was not duplicated but extendedSituation was updated
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      // Should still have only one instance in foldedSteps
      expect(updatedSimulation.foldedSteps).toEqual(['transport . voiture'])
      // But extendedSituation should be updated with new value
      expect(
        updatedSimulation.extendedSituation['transport . voiture']
      ).toEqual({
        source: 'default',
        nodeValue: 2000,
      })
    })

    it('should update actionChoices', () => {
      // Arrange
      const currentSimulation = createMockSimulation({ id: 'current-sim' })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const newActionChoices = { 'transport . voiture': true }

      // Act: Update action choices
      act(() => {
        result.current.updateCurrentSimulation({
          actionChoices: newActionChoices,
        })
      })

      // Assert: Verify action choices were updated
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.actionChoices).toEqual(newActionChoices)
    })

    it('should add and remove polls correctly', () => {
      // Arrange
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        polls: ['poll-1', 'poll-2'],
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Add and remove polls
      act(() => {
        result.current.updateCurrentSimulation({
          pollToAdd: 'poll-3',
          pollToDelete: 'poll-1',
        })
      })

      // Assert: Verify polls were updated correctly
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.polls).toEqual(['poll-2', 'poll-3'])
    })

    it('should add and remove groups correctly', () => {
      // Arrange
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        groups: ['group-1', 'group-2'],
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Add and remove groups
      act(() => {
        result.current.updateCurrentSimulation({
          groupToAdd: 'group-3',
          groupToDelete: 'group-1',
        })
      })

      // Assert: Verify groups were updated correctly
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.groups).toEqual(['group-2', 'group-3'])
    })

    it('should update savedViaEmail status', () => {
      // Arrange
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        savedViaEmail: false,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Update savedViaEmail
      act(() => {
        result.current.updateCurrentSimulation({ savedViaEmail: true })
      })

      // Assert: Verify savedViaEmail was updated
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.savedViaEmail).toBe(true)
    })

    it('should not update other simulations when updating current one', () => {
      // Arrange: Set up multiple simulations
      const currentSimulation = createMockSimulation({ id: 'current-sim' })
      const otherSimulation = createMockSimulation({ id: 'other-sim' })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation, otherSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Act: Update current simulation
      act(() => {
        result.current.updateCurrentSimulation({ progression: 0.5 })
      })

      // Assert: Verify only current simulation was updated
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([
        currentSimulation,
        otherSimulation,
      ])

      expect(resultSimulations[0].progression).toBe(0.5) // Current simulation updated
      expect(resultSimulations[1].progression).toBe(0) // Other simulation unchanged
    })
  })

  describe('currentSimulation', () => {
    it('should return current simulation based on currentSimulationId', () => {
      // Arrange: Set up simulations with specific IDs
      const simulation1 = createMockSimulation({
        id: 'sim-1',
        progression: 0.2,
      })
      const simulation2 = createMockSimulation({
        id: 'sim-2',
        progression: 0.5,
      })
      const simulation3 = createMockSimulation({
        id: 'sim-3',
        progression: 0.8,
      })

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [simulation1, simulation2, simulation3],
          setSimulations: vi.fn(),
          currentSimulationId: 'sim-2',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Assert: Verify correct simulation is returned
      expect(result.current.currentSimulation).toEqual(simulation2)
    })

    it('should return first simulation when currentSimulationId is not found', () => {
      // Arrange: Set up simulations with different IDs than currentSimulationId
      const simulation1 = createMockSimulation({
        id: 'sim-1',
        progression: 0.2,
      })
      const simulation2 = createMockSimulation({
        id: 'sim-2',
        progression: 0.5,
      })

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [simulation1, simulation2],
          setSimulations: vi.fn(),
          currentSimulationId: 'non-existent-id',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Assert: Verify first simulation is returned as fallback
      expect(result.current.currentSimulation).toEqual(simulation1)
    })

    it('should return first simulation when simulations list is empty', () => {
      // Arrange: Set up empty simulations list
      const { result } = renderHook(() =>
        useSimulations({
          simulations: [],
          setSimulations: vi.fn(),
          currentSimulationId: 'any-id',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Assert: Verify undefined is returned when no simulations exist
      expect(result.current.currentSimulation).toBeUndefined()
    })
  })

  describe('memoization', () => {
    it('should memoize currentSimulation and only recalculate when dependencies change', () => {
      // Arrange: Set up simulations
      const simulation1 = createMockSimulation({ id: 'sim-1' })
      const simulation2 = createMockSimulation({ id: 'sim-2' })
      const simulations = [simulation1, simulation2]

      const { result, rerender } = renderHook(
        ({ currentSimulationId }) =>
          useSimulations({
            simulations,
            setSimulations: vi.fn(),
            currentSimulationId,
            setCurrentSimulationId: vi.fn(),
            migrationInstructions: mockMigrationInstructions,
          }),
        { initialProps: { currentSimulationId: 'sim-1' } }
      )

      const firstCurrentSimulation = result.current.currentSimulation

      // Act: Rerender with same props
      rerender({ currentSimulationId: 'sim-1' })

      // Assert: Verify memoization works (same reference)
      expect(result.current.currentSimulation).toBe(firstCurrentSimulation)

      // Act: Rerender with different currentSimulationId
      rerender({ currentSimulationId: 'sim-2' })

      // Assert: Verify memoization recalculates (different reference)
      expect(result.current.currentSimulation).not.toBe(firstCurrentSimulation)
      expect(result.current.currentSimulation).toEqual(simulation2)
    })
  })

  describe('test validation - verifying tests actually test functionality', () => {
    it('should correctly verify initSimulation calls setSimulations', () => {
      // This test verifies that our initSimulation test is actually testing the correct behavior
      const setSimulations = vi.fn()
      const setCurrentSimulationId = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [],
          setSimulations,
          currentSimulationId: '',
          setCurrentSimulationId,
          migrationInstructions: mockMigrationInstructions,
        })
      )

      act(() => {
        result.current.initSimulation({ id: 'test-id' })
      })

      // Verify that setSimulations is called exactly once (correct behavior)
      expect(setSimulations).toHaveBeenCalledTimes(1)
      expect(setCurrentSimulationId).toHaveBeenCalledTimes(1)
    })

    it('should correctly verify deleteSimulation removes the right simulation', () => {
      // This test verifies that our deleteSimulation test is actually testing the correct behavior
      const simulation1 = createMockSimulation({ id: 'sim-1' })
      const simulation2 = createMockSimulation({ id: 'sim-2' })
      const initialSimulations = [simulation1, simulation2]
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: initialSimulations,
          setSimulations,
          currentSimulationId: 'sim-1',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      act(() => {
        result.current.deleteSimulation('sim-1')
      })

      // Verify that the correct simulation is removed (sim-1 should be removed, sim-2 should remain)
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction(initialSimulations)
      expect(resultSimulations).toEqual([simulation2]) // Correct expectation - sim-1 removed, sim-2 remains
    })

    it('should correctly verify currentSimulation returns the right simulation', () => {
      // This test verifies that our currentSimulation test is actually testing the correct behavior
      const simulation1 = createMockSimulation({
        id: 'sim-1',
        progression: 0.2,
      })
      const simulation2 = createMockSimulation({
        id: 'sim-2',
        progression: 0.5,
      })

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [simulation1, simulation2],
          setSimulations: vi.fn(),
          currentSimulationId: 'sim-2',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      // Verify that the correct simulation is returned based on currentSimulationId
      expect(result.current.currentSimulation).toEqual(simulation2) // Correct expectation - should be simulation2
    })
  })

  describe('mosaic behavior validation - verifying actual functionality', () => {
    it('should correctly verify mosaic parent behavior', () => {
      // This test verifies that our mosaic parent test is actually testing the correct behavior
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: [],
        extendedSituation: {} as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const foldedStepToAdd = {
        foldedStep: 'divers . ameublement . meubles' as DottedName,
        value: 5,
        isMosaicParent: true,
        isMosaicChild: false,
      }

      act(() => {
        result.current.updateCurrentSimulation({ foldedStepToAdd })
      })

      // Verify correct behavior: mosaic parent should be added to foldedSteps but NOT to extendedSituation
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.foldedSteps).toContain(
        'divers . ameublement . meubles'
      )
      expect(
        updatedSimulation.extendedSituation['divers . ameublement . meubles']
      ).toBeUndefined() // Correct expectation - mosaic parent should NOT be added to extendedSituation
    })

    it('should correctly verify mosaic child behavior', () => {
      // This test verifies that our mosaic child test is actually testing the correct behavior
      const currentSimulation = createMockSimulation({
        id: 'current-sim',
        foldedSteps: [],
        extendedSituation: {} as ExtendedSituation,
      })
      const setSimulations = vi.fn()

      const { result } = renderHook(() =>
        useSimulations({
          simulations: [currentSimulation],
          setSimulations,
          currentSimulationId: 'current-sim',
          setCurrentSimulationId: vi.fn(),
          migrationInstructions: mockMigrationInstructions,
        })
      )

      const foldedStepToAdd = {
        foldedStep: 'divers . ameublement . meubles . canapé' as DottedName,
        value: 1,
        isMosaicParent: false,
        isMosaicChild: true,
      }

      act(() => {
        result.current.updateCurrentSimulation({ foldedStepToAdd })
      })

      // Verify correct behavior: mosaic child should be added to extendedSituation but NOT to foldedSteps
      const updateFunction = setSimulations.mock.calls[0][0]
      const resultSimulations = updateFunction([currentSimulation])
      const updatedSimulation = resultSimulations[0]

      expect(updatedSimulation.foldedSteps).not.toContain(
        'divers . ameublement . meubles . canapé'
      ) // Correct expectation - mosaic child should NOT be added to foldedSteps
      expect(
        updatedSimulation.extendedSituation[
          'divers . ameublement . meubles . canapé'
        ]
      ).toEqual({
        source: 'default',
        nodeValue: 1,
      })
    })
  })
})
