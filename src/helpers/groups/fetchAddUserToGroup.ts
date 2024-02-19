import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { Group } from '@/types/groups'

type Props = {
  group: Group
  name: string
  email?: string
  userId: string
  simulation?: Simulation
}

export const fetchAddUserToGroup = async ({
  group,
  name,
  email,
  userId,
  simulation,
}: Props) => {
  const response = await fetch(`${GROUP_URL}/add-participant`, {
    method: 'POST',
    body: JSON.stringify({
      _id: group._id,
      name,
      email: email || '',
      userId,
      simulation,
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
