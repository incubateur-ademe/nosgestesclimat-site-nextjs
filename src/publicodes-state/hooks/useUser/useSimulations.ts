'use client'

import { migrateSimulation } from '@/publicodes-state/helpers/migrateSimulation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  MigrationType,
  Simulation,
  UpdateCurrentSimulationProps,
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
  // This is a hack to return a promise when updating the simulations
  const resolveFunction: any = useRef(null)
  useEffect(() => {
    if (resolveFunction.current) {
      resolveFunction.current()
      resolveFunction.current = null
    }
  }, [simulations])

  const initSimulation = useCallback(
    ({
      id = uuidv4(),
      date = new Date().toISOString(),
      situation = {},
      foldedSteps = [],
      actionChoices = {},
      persona,
      computedResults,
      progression = 0,
      defaultAdditionalQuestionsAnswers,
      polls,
      groups,
      savedViaEmail,
    }: Partial<Simulation> = {}): Promise<void> => {
      return new Promise((resolve) => {
        resolveFunction.current = resolve

        resetAideSaisie()

        setSimulations((prevSimulations: Simulation[]) => {
          if (prevSimulations.find((simulation) => simulation.id === id)) {
            setCurrentSimulationId(id)
            return prevSimulations
          }

          const migratedSimulation = migrateSimulation({
            simulation: {
              id,
              date,
              situation,
              foldedSteps,
              actionChoices,
              persona,
              computedResults,
              progression,
              defaultAdditionalQuestionsAnswers,
              polls,
              groups,
              savedViaEmail,
            },
            migrationInstructions,
          })

          return [...prevSimulations, migratedSimulation]
        })

        setCurrentSimulationId(id)
      })
    },
    [migrationInstructions, setSimulations, setCurrentSimulationId]
  )

  const deleteSimulation = useCallback(
    (deletedSimulationId: string) => {
      return new Promise((resolve) => {
        resolveFunction.current = resolve

        setSimulations((prevSimulations: Simulation[]) =>
          [...prevSimulations].filter(
            (simulation: Simulation) => simulation.id !== deletedSimulationId
          )
        )
      })
    },
    [setSimulations]
  )

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
    }: UpdateCurrentSimulationProps): Promise<void> => {
      return new Promise((resolve) => {
        resolveFunction.current = resolve
        setSimulations((prevSimulations: Simulation[]) =>
          prevSimulations.map((simulation) => {
            if (simulation.id !== currentSimulationId) return simulation

            const simulationToUpdate = { ...simulation }

            if (situationToAdd !== undefined) {
              simulationToUpdate.situation = {
                ...simulationToUpdate.situation,
                ...situationToAdd,
              }
            }

            if (
              foldedStepToAdd !== undefined &&
              !simulationToUpdate.foldedSteps.includes(foldedStepToAdd)
            ) {
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

            return simulationToUpdate
          })
        )
      })
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
  localStorage.removeItem('transport . voiture . km')
  localStorage.removeItem('transport . avion . court courrier . heures de vol')
  localStorage.removeItem('transport . avion . moyen courrier . heures de vol')
  localStorage.removeItem('transport . avion . long courrier . heures de vol')
}
