import { fetchGroup } from '@/helpers/server/model/groups'
import { useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export function useFetchGroup(
  groupId?: string | null
): UseQueryResult<Group, Error> {
  const {
    user: { userId },
  } = useUser()

  return useQuery({
    queryKey: ['groups', userId, groupId],
    queryFn: () => fetchGroup({ userId, groupId }),
    refetchInterval: 60000,
    enabled: !!groupId,
  })
}
