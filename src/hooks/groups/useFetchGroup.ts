import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import type { Group, Participant } from '@/types/groups'
import { unformatSituation } from '@/utils/formatDataForDB'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroup(
  groupId?: string | null
): UseQueryResult<Group, Error> {
  const {
    user: { userId },
  } = useUser()

  return useQuery({
    queryKey: ['groups', userId, groupId],
    queryFn: () =>
      axios
        .get(`${GROUP_URL}/${userId}/${groupId}`)
        .then((response) => response.data)
        .then((data) => {
          return {
            ...data,
            participants: data.participants.map((participant: Participant) => ({
              ...participant,
              simulation: {
                ...participant.simulation,
                situation: unformatSituation(participant.simulation.situation),
              },
            })),
          }
        }),
    refetchInterval: 60000,
    enabled: !!groupId,
  })
}
