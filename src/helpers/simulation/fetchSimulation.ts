import { SERVER_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import axios from 'axios'

type Props = {
  simulationId?: string | null
}
export const fetchSimulation = async ({
  simulationId,
}: Props): Promise<Simulation> =>
  axios
    .post(`${SERVER_URL}/simulations/fetch-simulation`, {
      simulationId,
    })
    .then((res) => res.data)
