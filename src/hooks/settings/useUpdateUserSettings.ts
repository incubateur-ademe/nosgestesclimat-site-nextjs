import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  email: string
  userId: string
}

type FuncProps = {
  name: string
  newsletterIds: Record<number, boolean>
}

export function useUpdateUserSettings({ email, userId }: Props) {
  return useMutation({
    mutationKey: ['updateUserSettings', email, userId],
    mutationFn: async ({ name, newsletterIds }: FuncProps) =>
      axios.post(SERVER_URL + '/update-settings', {
        email,
        userId,
        name,
        newsletterIds,
      }),
  })
}
