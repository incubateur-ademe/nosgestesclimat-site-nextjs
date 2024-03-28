import { areComputedResultsDifferent } from '@/helpers/simulation/hasSimulationChanged'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { useCallback, useEffect, useRef } from 'react'
import { useFetchSimulation } from './useFetchSimulation'
import { useSaveSimulation } from './useSaveSimulation'

export function useUpdateSimulationSavedIfChanged() {
  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { simulation: simulationSaved } = useFetchSimulation({
    simulationId: currentSimulation?.id ?? '',
  })

  const { saveSimulationNotAsync } = useSaveSimulation()

  const handleUpdateSavedSimulation = useCallback(
    (simulation: Simulation) => {
      if (simulation && simulation?.progression === 1 && !!simulationSaved) {
        saveSimulationNotAsync({
          simulation,
          shouldSendSimulationEmail: false,
        })
      }
    },
    [saveSimulationNotAsync, simulationSaved]
  )

  const prevCurrentSimulation = useRef<Simulation | undefined>(
    currentSimulation
  )

  useEffect(() => {
    if (!currentSimulation) return

    if (
      areComputedResultsDifferent(
        prevCurrentSimulation.current,
        currentSimulation
      )
    ) {
      handleUpdateSavedSimulation(currentSimulation)
    }

    prevCurrentSimulation.current = currentSimulation
  }, [currentSimulation, handleUpdateSavedSimulation])
}
