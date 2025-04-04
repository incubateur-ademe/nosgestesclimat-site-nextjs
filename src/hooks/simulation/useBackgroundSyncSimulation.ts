import { SimulationSyncContext } from '@/components/providers/simulationProviders/SimulationSyncProvider'
import { useContext } from 'react'

export const useBackgroundSyncSimulation = () =>
  useContext(SimulationSyncContext)
