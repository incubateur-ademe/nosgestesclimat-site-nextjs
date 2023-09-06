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

  return {
    simulations,
    currentSimulation: simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    ),
    currentSimulationId,
    updateSituationOfCurrentSimulation,
    initSimulation,
  }
}
