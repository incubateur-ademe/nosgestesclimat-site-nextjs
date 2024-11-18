import { GROUP_URL } from '@/constants/urls'
import type { Group, Participant } from '@/types/groups'
import { unformatSituation } from '@/utils/formatDataForDB'
import type { UseQueryResult} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroup(
  groupId?: string | null
): UseQueryResult<Group, Error> {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () =>
      axios
        .post(`${GROUP_URL}/fetch`, {
          groupId,
        })
        .then((response) => {
          return response.data
        })
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
