import { SimulationSyncContext } from '@/components/providers/providers/SimulationSyncProvider'
import { useContext } from 'react'

export const useBackgroundSyncSimulation = () =>
  useContext(SimulationSyncContext)
