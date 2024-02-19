import { GROUP_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchGroups({
  userId,
  email,
}: {
  userId: string
  email: string
}) {
  return useQuery({
    queryKey: ['groups'],
    queryFn: () =>
      axios
        .post(`${GROUP_URL}/fetch-groups`, {
          userId,
          email,
        })
        .then((response) => {
          return response.data
        }),
  })
}
