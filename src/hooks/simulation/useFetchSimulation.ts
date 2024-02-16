import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import { useQuery } from '@tanstack/react-query'

type Props = {
  simulationId: string | null
}
export function useFetchSimulation({ simulationId }: Props) {
  const { data: simulation, isLoading } = useQuery({
    queryKey: ['fetch simulation', simulationId],
    queryFn: () => fetchSimulation({ simulationId }),
    enabled: simulationId ? true : false,
  })
  return { simulation, isLoading }
}
