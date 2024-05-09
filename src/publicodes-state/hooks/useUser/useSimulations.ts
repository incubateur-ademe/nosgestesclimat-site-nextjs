'use client'

import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
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
  const initSimulation = useCallback(
    ({
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
    }: Partial<Simulation> = {}) => {
      resetAideSaisie()

      let newCurrentId = id

      setSimulations((prevSimulations: Simulation[]) => {
        if (prevSimulations.find((simulation) => simulation.id === id)) {
          setCurrentSimulationId(id ?? '')
          return prevSimulations
        }

        const migratedSimulation = generateSimulation({
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
          migrationInstructions,
        })

        newCurrentId = migratedSimulation.id

        return [...prevSimulations, migratedSimulation]
      })

      setCurrentSimulationId(newCurrentId ?? '')
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
      situationToAdd,
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
            simulationToUpdate.situation = situation
          }

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
  localStorage.removeItem('transport . voiture . km')
  localStorage.removeItem('transport . avion . court courrier . heures de vol')
  localStorage.removeItem('transport . avion . moyen courrier . heures de vol')
  localStorage.removeItem('transport . avion . long courrier . heures de vol')
}
