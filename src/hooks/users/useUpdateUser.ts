import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { USER_URL } from '../../constants/urls'

type Props = {
  email?: string
  userId: string
}

type FuncProps = {
  newsletterIds: Record<number, boolean>
  email?: string
  name?: string
}

export function useUpdateUser({ email, userId }: Props) {
  return useMutation({
    mutationKey: ['user', userId],
    mutationFn: async ({ newsletterIds, email: emailParam, name }: FuncProps) =>
      axios.put(`${USER_URL}/${userId}`, {
        name,
        email: email || emailParam,
        contact: {
          listIds: Object.entries(newsletterIds).reduce(
            (acc: number[], [id, subscribed]) => {
              if (subscribed) {
                acc.push(+id)
              }

              return acc
            },
            []
          ),
        },
      }),
  })
}
