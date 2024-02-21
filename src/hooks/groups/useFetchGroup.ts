import { GROUP_URL } from '@/constants/urls'
import { Group } from '@/types/groups'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroup(
  groupId?: string | null
): UseQueryResult<Group, Error> {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () =>
      axios
        .post(`${GROUP_URL}/fetch-group`, {
          groupId,
        })
        .then((response) => {
          return response.data
        }),
    refetchInterval: 60000,
    enabled: !!groupId,
  })
}
