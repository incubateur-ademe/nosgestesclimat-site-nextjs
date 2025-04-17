import { SIMULATION_URL } from '@/constants/urls/main'
import { mapNewSimulationToOld } from '@/helpers/simulation/mapNewSimulation'
import { useUser } from '@/publicodes-state'
import { unformatSituation } from '@/utils/formatDataForDB'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  simulationId: string | null
}
export function useFetchSimulation({ simulationId }: Props) {
  const {
    user: { userId },
  } = useUser()

  const { data: simulation, isLoading } = useQuery({
    queryKey: ['simulations', simulationId],
    queryFn: () =>
      axios.get(`${SIMULATION_URL}/${userId}/${simulationId}`).then((res) =>
        mapNewSimulationToOld({
          ...res.data,
          situation: unformatSituation(res.data.situation),
        })
      ),
    enabled: simulationId ? true : false,
  })
  return { simulation, isLoading }
}
