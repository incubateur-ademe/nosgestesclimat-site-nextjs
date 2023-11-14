import { GROUP_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroups(userId: string) {
  return useQuery({
    queryKey: ['groups'],
    queryFn: () =>
      axios.get(`${GROUP_URL}/user-groups/${userId}`).then((response) => {
        return response.data
      }),
  })
}
