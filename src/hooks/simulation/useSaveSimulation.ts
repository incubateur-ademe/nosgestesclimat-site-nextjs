import { SAVE_SIMULATION_URL } from '@/constants/urls'
import { Simulation, User } from '@/publicodes-state/types'
import { formatSituation } from '@/utils/formatDataForDB'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  simulation: Simulation
  user: User
}
export function useSaveSimulation() {
  const { mutateAsync: saveSimulation, isPending } = useMutation({
    mutationFn: ({ simulation, user }: Props) => {
      // We need to format the situation to be saved in the database
      simulation.situation = formatSituation(simulation.situation)

      return axios
        .post(SAVE_SIMULATION_URL, {
          simulation,
          userId: user.userId,
          email: user.email,
          name: user.name,
        })
        .then((response) => response.data)
        .catch(() => console.error('Failed to save simulation'))
    },
  })
  return {
    saveSimulation,
    isPending,
  }
}
