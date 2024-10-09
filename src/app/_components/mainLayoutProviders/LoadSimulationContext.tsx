import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { createContext } from 'react'

export const LoadSimulationContext = createContext<boolean>(false)

export function LoadSimulationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  return (
    <LoadSimulationContext.Provider value={isCorrectSimulationSet}>
      {children}
    </LoadSimulationContext.Provider>
  )
}
