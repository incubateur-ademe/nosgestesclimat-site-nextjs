'use client'

import { migrateSimulation } from '@/publicodes-state/helpers/migrateSimulation'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  ActionChoices,
  ComputedResults,
  MigrationType,
  Simulation,
  Situation,
} from '../../types'

type Props = {
  simulations: Simulation[]
  setSimulations: Dispatch<SetStateAction<Simulation[]>>
  currentSimulationId: string
  setCurrentSimulationId: Dispatch<SetStateAction<string>>
  migrationInstructions: MigrationType
}
export default function useSimulations({
  simulations,
  setSimulations,
  currentSimulationId,
  setCurrentSimulationId,
  migrationInstructions,
}: Props) {
  const resetAideSaisie = () => {
    localStorage.removeItem('transport . voiture . km')
    localStorage.removeItem(
      'transport . avion . court courrier . heures de vol'
    )
    localStorage.removeItem(
      'transport . avion . moyen courrier . heures de vol'
    )
    localStorage.removeItem('transport . avion . long courrier . heures de vol')
  }

  const initSimulation = ({
    situation = {},
    persona,
    foldedSteps = [],
    defaultAdditionalQuestionsAnswers,
    poll,
    group,
  }: {
    situation?: Situation
    persona?: string
    foldedSteps?: string[]
    defaultAdditionalQuestionsAnswers?: Record<string, string>
    poll?: string
    group?: string
  } = {}) => {
    const id = uuidv4()

    resetAideSaisie()

    setSimulations((prevSimulations: Simulation[]) => [
      ...prevSimulations,
      {
        id,
        date: new Date().toISOString(),
        situation,
        foldedSteps,
        actionChoices: {},
        persona,
        defaultAdditionalQuestionsAnswers,
        poll,
        group,
      },
    ])

    setCurrentSimulationId(id)

    return id
  }

  const updateCurrentSimulation = useCallback(
    ({
      situationToAdd,
      foldedStepToAdd,
      actionChoices,
      defaultAdditionalQuestionsAnswers,
      computedResults,
      progression,
      pollToAdd,
      pollToDelete,
      groupToAdd,
      groupToDelete,
      savedViaEmail,
    }: {
      situationToAdd?: Situation
      foldedStepToAdd?: string
      defaultAdditionalQuestionsAnswers?: Record<string, string>
      actionChoices?: ActionChoices
      computedResults?: ComputedResults
      progression?: number
      pollToAdd?: string | null
      pollToDelete?: string | null
      groupToAdd?: string | null
      groupToDelete?: string | null
      savedViaEmail?: boolean
    }) => {
      if (!currentSimulationId) return

      const simulationToUpdateFound = simulations.find(
        (simulation: Simulation) => simulation.id === currentSimulationId
      )

      if (!simulationToUpdateFound) return

      const simulationToUpdate = { ...simulationToUpdateFound }

      if (situationToAdd !== undefined) {
        simulationToUpdate.situation = {
          ...simulationToUpdate.situation,
          ...situationToAdd,
        }
      }

      if (foldedStepToAdd !== undefined) {
        simulationToUpdate.foldedSteps = [
          ...(simulationToUpdate.foldedSteps || []),
          foldedStepToAdd,
        ]
      }

      if (actionChoices !== undefined) {
        simulationToUpdate.actionChoices = actionChoices
      }

      if (defaultAdditionalQuestionsAnswers !== undefined) {
        simulationToUpdate.defaultAdditionalQuestionsAnswers =
          defaultAdditionalQuestionsAnswers
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

      setSimulations((prevSimulations: Simulation[]) => [
        ...prevSimulations.filter(
          (simulation: Simulation) => simulation.id !== currentSimulationId
        ),
        simulationToUpdate,
      ])
    },
    [currentSimulationId, setSimulations, simulations]
  )

  const updateSituationOfCurrentSimulation = (situationToAdd: Situation) => {
    if (currentSimulationId) {
      setSimulations((prevSimulations: Simulation[]) => {
        const simulationUpdated = prevSimulations.find(
          (simulation: Simulation) => simulation.id === currentSimulationId
        )

        if (!simulationUpdated) return prevSimulations // TODO: should throw error
        return [
          ...prevSimulations.filter(
            (simulation: Simulation) => simulation.id !== currentSimulationId
          ),
          {
            ...simulationUpdated,
            situation: {
              ...simulationUpdated?.situation,
              ...situationToAdd,
            },
          },
        ]
      })
    }
  }

  const updateFoldedStepsOfCurrentSimulation = (foldedStep: string) => {
    if (currentSimulationId) {
      setSimulations((prevSimulations: Simulation[]) => {
        const simulationUpdated = prevSimulations.find(
          (simulation: Simulation) => simulation.id === currentSimulationId
        )

        if (!simulationUpdated) return prevSimulations // TODO: should throw error
        return [
          ...prevSimulations.filter(
            (simulation: Simulation) => simulation.id !== currentSimulationId
          ),
          {
            ...simulationUpdated,
            foldedSteps: [...simulationUpdated.foldedSteps, foldedStep],
          },
        ]
      })
    }
  }

  const updateCurrentSimulationActionChoices = (
    actionChoices: ActionChoices
  ) => {
    const updatedSimulations = simulations.map((simulation) => {
      if (simulation.id === currentSimulationId) {
        return {
          ...simulation,
          actionChoices,
        }
      }
      return simulation
    })
    setSimulations(updatedSimulations)
  }

  const addSimulation = (simulation: Simulation) => {
    // Avoid duplicating simulations
    if (simulations.find((s) => s.id === simulation.id)) {
      setCurrentSimulationId(simulation.id)
      return
    }

    const migratedSimulation = migrateSimulation({
      simulation,
      migrationInstructions,
    })

    setSimulations((prevSimulations: Simulation[]) => [
      ...prevSimulations,
      migratedSimulation,
    ])

    setCurrentSimulationId(simulation.id)
  }

  const deleteSimulation = (deletedSimulationId: string) => {
    setSimulations((prevSimulations: Simulation[]) =>
      [...prevSimulations].filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      )
    )
  }

  type GetCurrentSimulationProps = {
    deepCopy: boolean
  }
  const getCurrentSimulationPropsDefault = {
    deepCopy: false,
  }
  const getCurrentSimulation = ({
    deepCopy = false,
  }: GetCurrentSimulationProps = getCurrentSimulationPropsDefault):
    | Simulation
    | undefined => {
    const simulation = simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    )
    if (!simulation) return undefined

    return deepCopy ? JSON.parse(JSON.stringify(simulation)) : { ...simulation }
  }
  const updateProgressionOfCurrentSimulation = useCallback(
    (progression: number) => {
      if (currentSimulationId) {
        setSimulations((prevSimulations: Simulation[]) => {
          const simulationUpdated = prevSimulations.find(
            (simulation: Simulation) => simulation.id === currentSimulationId
          )

          if (!simulationUpdated) return prevSimulations

          return [
            ...prevSimulations.filter(
              (simulation: Simulation) => simulation.id !== currentSimulationId
            ),
            {
              ...simulationUpdated,
              progression,
            },
          ]
        })
      }
    },
    [currentSimulationId, setSimulations]
  )

  return {
    simulations,
    currentSimulation: getCurrentSimulation(),
    getCurrentSimulation,
    currentSimulationId,
    updateCurrentSimulation,
    updateSituationOfCurrentSimulation,
    updateProgressionOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    initSimulation,
    addSimulation,
    deleteSimulation,
  }
}
