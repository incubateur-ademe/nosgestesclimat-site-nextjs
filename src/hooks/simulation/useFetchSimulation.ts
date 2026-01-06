import { SIMULATION_URL } from '@/constants/urls/main'
import { getInitialExtendedSituation } from '@/helpers/modelFetching/getInitialExtendedSituation'
import { mapNewSimulationToOld } from '@/helpers/simulation/mapNewSimulation'
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
        const mappedSimulation = mapNewSimulationToOld({
          ...res.data,
          situation: unformatSituation(res.data.situation),
        })

        // Ensure extendedSituation is always defined (for old simulations that might not have it)
        if (!mappedSimulation.extendedSituation) {
          mappedSimulation.extendedSituation = getInitialExtendedSituation()
        }

        return mappedSimulation
      }),
    enabled: simulationId ? true : false,
  })
  return { simulation, isLoading }
}
