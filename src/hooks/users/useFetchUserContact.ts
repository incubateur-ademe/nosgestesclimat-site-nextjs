import { USER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type UserContact = {
  id: number
  email: string
  listIds: number[]
}

export function useFetchUserContact(userId: string) {
  return useQuery({
    queryKey: ['user', userId, 'contact'],
    queryFn: async () =>
      axios
        .get<UserContact>(`${USER_URL}/${userId}/contact`)
        .then((res) => res.data),
    retry: false,
  })
}
