import { SimulationSyncContext } from '@/app/_components/mainLayoutProviders/SimulationSyncProvider'
import { useContext } from 'react'

export const useBackgroundSyncSimulation = () =>
  useContext(SimulationSyncContext)
