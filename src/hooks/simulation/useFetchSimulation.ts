import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import { useQuery } from '@tanstack/react-query'
import { useSimulationIdInQueryParams } from './useSimulationIdInQueryParams'

export function useFetchSimulation() {
  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const { data: simulation, isLoading } = useQuery({
    queryKey: ['simulation', simulationIdInQueryParams],
    queryFn: () => fetchSimulation({ simulationId: simulationIdInQueryParams }),
    enabled: simulationIdInQueryParams ? true : false,
  })
  return { simulation, isLoading }
}
