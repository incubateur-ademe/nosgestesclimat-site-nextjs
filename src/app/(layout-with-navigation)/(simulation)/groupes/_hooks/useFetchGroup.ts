import { GROUP_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroup(groupId: string) {
  return useQuery({
    queryKey: ['group'],
    queryFn: () =>
      axios.get(`${GROUP_URL}/${groupId}`).then((response) => {
        return response.data
      }),
    enabled: !!groupId,
  })
}
