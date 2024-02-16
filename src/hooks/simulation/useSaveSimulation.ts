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

      // If the user has an id, we need to format it to userId
      const userWithUserId = formatUser({ user })

      return axios
        .post(SAVE_SIMULATION_URL, {
          simulation,
          user: userWithUserId,
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

function formatUser({ user }: { user: User }) {
  if (!user.id) return user

  return {
    ...user,
    userId: user.id,
  }
}
