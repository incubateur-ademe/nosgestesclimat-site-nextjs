import { SIMULATION_URL } from '@/constants/urls/main'
import { setDefaultExtendedSituation } from '@/helpers/server/model/utils/setDefaultExtendedSituation'
import { useUser } from '@/publicodes-state'
import { unformatSituation } from '@/utils/formatDataForDB'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Props {
  simulationId: string | null
}
export function useFetchSimulation({ simulationId }: Props) {
  const {
    user: { userId },
  } = useUser()

  const { data: simulation, isLoading } = useQuery({
    queryKey: ['simulations', simulationId],
    queryFn: () =>
      axios.get(`${SIMULATION_URL}/${userId}/${simulationId}`).then((res) => {
        const updatedSimulation = {
          ...res.data,
          situation: unformatSituation(res.data.situation),
        }

        return setDefaultExtendedSituation(updatedSimulation)
      }),
    enabled: simulationId ? true : false,
  })
  return { simulation, isLoading }
}
