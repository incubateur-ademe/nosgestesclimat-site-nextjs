import { SERVER_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateNewslettersSubscriptions() {
  return useMutation({
    mutationKey: ['updateNewslettersSubscriptions'],
    mutationFn: async ({
      newsletterIds,
      userId,
      email,
      name,
    }: {
      newsletterIds: string[]
      userId: string
      email: string
      name: string
    }) => {
      return await axios
        .put(`${SERVER_URL}/users/v1/${userId}`, {
          email,
          name,
          contact: {
            listIds: newsletterIds,
          },
        })
        .then((res) => res.data)
    },
  })
}
