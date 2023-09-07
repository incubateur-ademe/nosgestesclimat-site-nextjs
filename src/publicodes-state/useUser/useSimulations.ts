'use client'

import { Simulation } from '@/types/simulation'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  simulations: any[]
  setSimulations: any
  currentSimulationId: string
  setCurrentSimulationId: any
}
export default function useSimulations({
  simulations,
  setSimulations,
  currentSimulationId,
  setCurrentSimulationId,
}: Props) {
  const initSimulation = ({
    situation = {},
    persona,
  }: { situation?: any; persona?: string } = {}) => {
    const id = uuidv4()

    setSimulations((prevSimulations: any[]) => [
      ...prevSimulations,
      {
        id,
        date: new Date().toISOString(),
        situation,
        persona,
      },
    ])

    setCurrentSimulationId(id)

    return id
  }

  const updateSituationOfCurrentSimulation = (situationToAdd: any) => {
    if (currentSimulationId) {
      setSimulations((prevSimulations: any) => {
        const simulationUpdated = prevSimulations.find(
          (simulation: Simulation) => simulation.id === currentSimulationId
        )

        return [
          ...prevSimulations.filter(
            (simulation: any) => simulation.id !== currentSimulationId
          ),
          {
            ...simulationUpdated,
            situation: {
              ...simulationUpdated.situation,
              ...situationToAdd,
            },
          },
        ]
      })
    }
  }

  const updateCurrentSimulationActionChoices = (actionChoices: any) => {
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

  const getCurrentSimulation = () =>
    simulations.find((simulation: any) => simulation.id === currentSimulationId)

  const deleteSimulation = (deletedSimulationId: string) => {
    setSimulations((prevSimulations: any) =>
      [...prevSimulations].filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      )
    )
  }

  return {
    simulations,
    currentSimulation: simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    ),
    currentSimulationId,
    updateSituationOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    initSimulation,
    deleteSimulation,
    getCurrentSimulation,
  }
}
