import { SERVER_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateUserSettings() {
  return useMutation({
    mutationKey: ['updateUserSettings'],
    mutationFn: async ({
      newsletterIds,
      userId,
      email,
      name,
      code,
    }: {
      newsletterIds?: number[]
      userId: string
      email?: string
      name?: string
      code?: string
    }) => {
      return await axios
        .put(
          `${SERVER_URL}/users/v1/${userId}`,
          {
            email,
            name,
            contact:
              newsletterIds && newsletterIds.length > 0
                ? {
                    listIds: newsletterIds,
                  }
                : undefined,
          },
          {
            params: {
              code,
            },
          }
        )
        .then((res) => res.data)
    },
  })
}
