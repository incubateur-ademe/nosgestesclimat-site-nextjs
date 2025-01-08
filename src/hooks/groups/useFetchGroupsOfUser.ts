import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroupsOfUser() {
  const {
    user: { userId },
  } = useUser()

  return useQuery({
    queryKey: ['groups', userId],
    queryFn: () =>
      axios
        .get<Group[]>(`${GROUP_URL}/${userId}`)
        .then((response) => response.data),
    initialData: undefined,
  })
}
