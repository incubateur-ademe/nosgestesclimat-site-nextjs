'use client'

import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type {
  DottedName,
  ExtendedSituation,
  NodeValue,
} from '@incubateur-ademe/nosgestesclimat'
import type { Migration } from '@publicodes/tools/migration'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo } from 'react'
import type { Simulation, UpdateCurrentSimulationProps } from '../../../types'

type Props = {
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
  setCurrentSimulationId,
  migrationInstructions,
}: Props) {
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
      defaultAdditionalQuestionsAnswers,
      polls,
      groups,
      savedViaEmail,
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
        defaultAdditionalQuestionsAnswers,
        polls,
        groups,
        savedViaEmail,
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
      defaultAdditionalQuestionsAnswers,
      customAdditionalQuestionsAnswers,
      computedResults,
      progression,
      pollToAdd,
      pollToDelete,
      groupToAdd,
      groupToDelete,
      savedViaEmail,
    }: UpdateCurrentSimulationProps) => {
      setSimulations((prevSimulations: Simulation[]) =>
        prevSimulations.map((simulation) => {
          if (simulation.id !== currentSimulationId) return simulation

          const simulationToUpdate = { ...simulation }

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
                  !simulationToUpdateSituationKeysSet.has(dottedName) ||
                  situation[dottedName as DottedName] !==
                    simulationToUpdate.situation[dottedName as DottedName]
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
            }

            simulationToUpdate.situation = situation
          }

          if (foldedSteps !== undefined) {
            // We sync the extendedSituation if foldedSteps are removed. If foldedStep is added, it is dealt with foldedStepToAdd.
            const removedDottedNames = simulationToUpdate.foldedSteps.filter(
              (dottedName) => !foldedSteps.includes(dottedName as DottedName)
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
                nodeValue: foldedStepToAdd.value ?? 'non défini',
              }
            }
          }

          if (actionChoices !== undefined) {
            simulationToUpdate.actionChoices = actionChoices
          }

          if (defaultAdditionalQuestionsAnswers !== undefined) {
            simulationToUpdate.defaultAdditionalQuestionsAnswers =
              defaultAdditionalQuestionsAnswers
          }

          if (customAdditionalQuestionsAnswers !== undefined) {
            simulationToUpdate.customAdditionalQuestionsAnswers =
              customAdditionalQuestionsAnswers
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
              (poll) => poll !== pollToDelete
            )
          }

          if (groupToAdd) {
            simulationToUpdate.groups = [
              ...(simulationToUpdate.groups ?? []),
              groupToAdd,
            ]
          }

          if (groupToDelete && simulationToUpdate.groups) {
            simulationToUpdate.groups = simulationToUpdate.groups.filter(
              (group) => group !== groupToDelete
            )
          }

          if (savedViaEmail !== undefined) {
            simulationToUpdate.savedViaEmail = savedViaEmail
          }

          return simulationToUpdate
        })
      )
    },
    [currentSimulationId, setSimulations]
  )

  const currentSimulation = useMemo<Readonly<Simulation>>(
    () =>
      simulations.find(
        (simulation: Simulation) => simulation.id === currentSimulationId
      ) ?? simulations[0],
    [currentSimulationId, simulations]
  )

  return {
    initSimulation,
    deleteSimulation,
    currentSimulation,
    updateCurrentSimulation,
  }
}

const resetAideSaisie = () => {
  safeLocalStorage.removeItem('transport . voiture . km')
  safeLocalStorage.removeItem(
    'transport . avion . court courrier . heures de vol'
  )
  safeLocalStorage.removeItem(
    'transport . avion . moyen courrier . heures de vol'
  )
  safeLocalStorage.removeItem(
    'transport . avion . long courrier . heures de vol'
  )
}
