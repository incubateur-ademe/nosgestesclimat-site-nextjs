import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroupsOfUser() {
  const { user } = useUser()

  return useQuery({
    queryKey: ['groups', user.userId],
    queryFn: () =>
      axios
        .post(`${GROUP_URL}/fetch-groups`, {
          userId: user.userId,
        })
        .then((response) => {
          return response.data
        }),
    initialData: [],
  })
}
