import { GROUP_URL } from '@/constants/urls'
import { Group } from '@/types/groups'

type Props = {
  group: Group
  userId: string
  simulation: any
}

export const fetchUpdateGroupMember = async ({
  group,
  userId,
  simulation,
}: Props) => {
  const response = await fetch(`${GROUP_URL}/update-member`, {
    method: 'POST',
    body: JSON.stringify({
      _id: group._id,
      memberUpdates: {
        userId,
        simulation,
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
