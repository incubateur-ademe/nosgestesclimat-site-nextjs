import { SAVE_SIMULATION_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { formatSituation } from '@/utils/formatDataForDB'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  simulation: Simulation
}
export function useSaveSimulation() {
  const { mutateAsync: saveSimulation, isPending } = useMutation({
    mutationFn: ({ simulation }: Props) => {
      simulation.situation = formatSituation(simulation.situation)

      return axios
        .post(SAVE_SIMULATION_URL, {
          simulation,
        })
        .then((response) => response.data)
    },
  })
  return {
    saveSimulation,
    isPending,
  }
}
