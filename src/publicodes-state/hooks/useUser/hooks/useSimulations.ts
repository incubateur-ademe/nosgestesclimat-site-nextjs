'use client'

import { getInitialExtendedSituation } from '@/helpers/modelFetching/getInitialExtendedSituation'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { migrateSimulation } from '@/publicodes-state/helpers/migrateSimulation'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type {
  DottedName,
  ExtendedSituation,
  NodeValue,
} from '@incubateur-ademe/nosgestesclimat'
import type { Migration } from '@publicodes/tools/migration'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { Simulation, UpdateCurrentSimulationProps } from '../../../types'

interface Props {
  simulations: Simulation[]
  setSimulations: Dispatch<SetStateAction<Simulation[]>>
  currentSimulationId: string
  setCurrentSimulationId: Dispatch<SetStateAction<string>>
  migrationInstructions: Migration
}

export default function useSimulations({
  simulations,
  setSimulations,
  currentSimulationId,
  setCurrentSimulationId: rawSetCurrentSimulationId,
  migrationInstructions,
}: Props) {
  // Keep a ref that always holds the latest currentSimulationId.
  // The wrapped setCurrentSimulationId below updates it synchronously
  // (before React re-renders), and this effect is a safety-net for any
  // change that comes from the parent/context without going through the
  // wrapper. Because updateCurrentSimulation is only ever called from
  // effects or event handlers (never during render), the effect-based
  // sync is sufficient.
  const currentSimulationIdRef = useRef(currentSimulationId)

  useEffect(() => {
    currentSimulationIdRef.current = currentSimulationId
  }, [currentSimulationId])

  // Wrapped setter that also updates the ref synchronously, so any
  // subsequent call to updateCurrentSimulation (even before re-render)
  // reads the correct id from the ref.
  const setCurrentSimulationId = useCallback(
    (id: string) => {
      currentSimulationIdRef.current = id
      rawSetCurrentSimulationId(id)
    },
    [rawSetCurrentSimulationId]
  )

  const initSimulation = useCallback(
    ({
      id,
      date,
      situation,
      extendedSituation,
      foldedSteps,
      actionChoices,
      persona,
      computedResults,
      progression,
      polls,
      groups,
    }: Partial<Simulation> = {}) => {
      resetAideSaisie()

      const migratedSimulation = generateSimulation({
        id,
        date,
        situation,
        extendedSituation,
        foldedSteps,
        actionChoices,
        persona,
        computedResults,
        progression,
        polls,
        groups,
        migrationInstructions,
      })
      setSimulations((prevSimulations: Simulation[]) => {
        if (id && prevSimulations.find((simulation) => simulation.id === id)) {
          return prevSimulations
        }
        return [...prevSimulations, migratedSimulation]
      })

      setCurrentSimulationId(migratedSimulation.id)
    },
    [migrationInstructions, setSimulations, setCurrentSimulationId]
  )

  const deleteSimulation = useCallback(
    (deletedSimulationId: string) => {
      setSimulations((prevSimulations: Simulation[]) =>
        [...prevSimulations].filter(
          (simulation: Simulation) => simulation.id !== deletedSimulationId
        )
      )
    },
    [setSimulations]
  )

  const updateCurrentSimulation = useCallback(
    ({
      situation,
      foldedSteps,
      foldedStepToAdd,
      actionChoices,
      computedResults,
      progression,
      pollToAdd,
      pollToDelete,
      groupToAdd,
      groupToDelete,
    }: UpdateCurrentSimulationProps) => {
      setSimulations((prevSimulations: Simulation[]) =>
        prevSimulations.map((simulation) => {
          // Read the latest currentSimulationId from the ref instead of
          // the closure to avoid stale-closure bugs when setSimulations
          // and setCurrentSimulationId are called separately (e.g. during
          // reconcileUserOnAuth).
          if (simulation.id !== currentSimulationIdRef.current)
            return simulation

          const simulationToUpdate = { ...simulation }

          // Ensure extendedSituation is always defined (for old simulations that might not have it)
          if (!simulationToUpdate.extendedSituation) {
            simulationToUpdate.extendedSituation = getInitialExtendedSituation()
          }

          if (situation !== undefined) {
            // We sync the extendedSituation with the situation detecting added, modified or removed dottedNames from the updated situation.

            const situationKeys = Object.keys(situation)
            const situationKeySet = new Set(situationKeys)

            const simulationToUpdateSituationKeys = Object.keys(
              simulationToUpdate.situation
            )
            const simulationToUpdateSituationKeysSet = new Set(
              simulationToUpdateSituationKeys
            )

            const addedOrChangedDottedNames = situationKeys.reduce(
              (acc, dottedName) => {
                if (
                  dottedName in simulationToUpdate.extendedSituation &&
                  (!simulationToUpdateSituationKeysSet.has(dottedName) ||
                    situation[dottedName as DottedName] !==
                      simulationToUpdate.situation[dottedName as DottedName])
                ) {
                  acc[dottedName as keyof ExtendedSituation] = {
                    source: 'answered',
                    nodeValue: situation[dottedName as DottedName] as NodeValue,
                  }
                }
                return acc
              },
              {} as Partial<ExtendedSituation>
            )

            const removedDottedNames = simulationToUpdateSituationKeys.reduce(
              (acc, dottedName) => {
                if (!situationKeySet.has(dottedName)) {
                  acc[dottedName as keyof ExtendedSituation] = {
                    source: 'omitted',
                  }
                }
                return acc
              },
              {} as Partial<ExtendedSituation>
            )

            simulationToUpdate.extendedSituation = {
              ...simulationToUpdate.extendedSituation,
              ...addedOrChangedDottedNames,
              ...removedDottedNames,
            } as ExtendedSituation

            simulationToUpdate.situation = situation
          }

          if (foldedSteps !== undefined) {
            // We sync the extendedSituation if foldedSteps are removed. If foldedStep is added, it is dealt with foldedStepToAdd.
            const removedDottedNames = simulationToUpdate.foldedSteps.filter(
              (dottedName) => !foldedSteps.includes(dottedName)
            )
            removedDottedNames.forEach((dottedName) => {
              simulationToUpdate.extendedSituation[
                dottedName as keyof ExtendedSituation
              ] = {
                source: 'omitted',
              }
            })
            simulationToUpdate.foldedSteps = foldedSteps
          }

          if (foldedStepToAdd !== undefined) {
            if (
              !simulationToUpdate.foldedSteps.includes(
                foldedStepToAdd.foldedStep
              ) &&
              !foldedStepToAdd.isMosaicChild
            ) {
              simulationToUpdate.foldedSteps = [
                ...(simulationToUpdate.foldedSteps || []),
                foldedStepToAdd.foldedStep,
              ]
            }

            if (!foldedStepToAdd.isMosaicParent) {
              simulationToUpdate.extendedSituation[
                foldedStepToAdd.foldedStep as keyof ExtendedSituation
              ] = {
                source: 'default',
                nodeValue:
                  foldedStepToAdd.value !== undefined &&
                  foldedStepToAdd.value !== null
                    ? foldedStepToAdd.value
                    : 'non défini',
              }
            }
          }

          if (actionChoices !== undefined) {
            simulationToUpdate.actionChoices = actionChoices
          }

          if (computedResults !== undefined) {
            simulationToUpdate.computedResults = computedResults
          }

          if (progression !== undefined) {
            simulationToUpdate.progression = progression
          }

          if (pollToAdd) {
            simulationToUpdate.polls = [
              ...(simulationToUpdate.polls ?? []),
              pollToAdd,
            ]
          }

          if (pollToDelete && simulationToUpdate.polls) {
            simulationToUpdate.polls = simulationToUpdate.polls.filter(
              (poll) => poll.slug !== pollToDelete
            )
          }

          if (groupToAdd) {
            simulationToUpdate.groups = [
              ...(simulationToUpdate.groups ?? []),
              { id: groupToAdd },
            ]
          }

          if (groupToDelete && simulationToUpdate.groups) {
            simulationToUpdate.groups = simulationToUpdate.groups.filter(
              (group) => group.id !== groupToDelete
            )
          }

          return simulationToUpdate
        })
      )
    },
    // currentSimulationId is intentionally NOT in this dependency array.
    // We read it from currentSimulationIdRef.current instead, which is
    // always kept in sync synchronously. This avoids the stale-closure
    // problem where updateCurrentSimulation captures an outdated
    // currentSimulationId when setSimulations and setCurrentSimulationId
    // are called separately (e.g. during auth reconciliation).
    [setSimulations]
  )

  const currentSimulation = useMemo<Readonly<Simulation>>(
    () =>
      simulations.find(
        (simulation: Simulation) => simulation.id === currentSimulationId
      ) ?? simulations[0],
    [currentSimulationId, simulations]
  )

  const updateSimulations = useCallback(
    (newSimulations: Simulation[]) => {
      setSimulations(
        newSimulations.map((simulation) =>
          migrateSimulation(simulation, migrationInstructions)
        )
      )
    },
    [migrationInstructions, setSimulations]
  )

  return {
    initSimulation,
    deleteSimulation,
    currentSimulation,
    updateCurrentSimulation,
    updateSimulations,
    setCurrentSimulationId,
  }
}

const resetAideSaisie = () => {
  safeLocalStorage.removeItem('transport . voiture . km')
}
