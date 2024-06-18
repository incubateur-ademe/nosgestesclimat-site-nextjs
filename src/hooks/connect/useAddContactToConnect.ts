import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  email: string
  name: string
  position?: string
}

export function useAddContactToConnect() {
  return useMutation({
    mutationKey: ['addContactToConnect'],
    mutationFn: ({ email, name, position }: Props) =>
      axios
        .post(
          `${SERVER_URL}/organisations/add-contact-to-connect`,
          {
            email,
            name,
            position,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
