'use server'

import { GROUP_URL } from '@/constants/urls/main'
import { getInitialExtendedSituation } from '@/helpers/modelFetching/getInitialExtendedSituation'
import type { Group, Participant } from '@/types/groups'
import { unformatSituation } from '@/utils/formatDataForDB'
import { captureException } from '@sentry/nextjs'
import { fetchServer } from './fetchServer'
import { getUser } from './user'

export async function getUserGroups(): Promise<Group[]> {
  const user = await getUser()
  if (!user) {
    return []
  }
  try {
    return await fetchServer<Group[]>(`${GROUP_URL}/${user.id}`)
  } catch (error) {
    captureException(error)
    return []
  }
}

export async function fetchGroup({
  userId,
  groupId,
}: {
  userId: string
  groupId?: string | null
}) {
  return fetchServer(`${GROUP_URL}/${userId}/${groupId}`).then((data) => {
    return {
      ...(data as Group),
      participants: (data as Group).participants.map(
        (participant: Participant) => {
          const simulation = {
            ...participant.simulation,
            situation: unformatSituation(participant.simulation.situation),
          }

          // Ensure extendedSituation is always defined (for old simulations that might not have it)
          if (!simulation.extendedSituation) {
            simulation.extendedSituation = getInitialExtendedSituation()
          }

          return {
            ...participant,
            simulation,
          }
        }
      ),
    } as Group
  })
}
