import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { Group, SimulationResults } from '@/types/groups'

type Props = {
  group: Group
  name: string
  email?: string
  userId: string
  simulation?: Simulation
  computedResults: SimulationResults
}

export const fetchAddUserToGroup = async ({
  group,
  name,
  email,
  userId,
  simulation,
  computedResults,
}: Props) => {
  const response = await fetch(`${GROUP_URL}/add-participant`, {
    method: 'POST',
    body: JSON.stringify({
      _id: group._id,
      name,
      email: email || '',
      userId,
      simulation: {
        ...simulation,
        computedResults,
      },
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Error while updating group')
  }
}
