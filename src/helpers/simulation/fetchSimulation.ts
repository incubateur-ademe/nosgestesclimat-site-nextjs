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
    .get(`${SERVER_URL}/simulation/${simulationId}`)
    .then((res) => res.data)
    .catch(() => console.error('Failed to fetch simulation'))
