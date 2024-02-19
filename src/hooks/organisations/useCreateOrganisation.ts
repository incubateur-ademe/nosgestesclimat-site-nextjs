import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useCreateOrganisation() {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      axios
        .post(`${SERVER_URL}/organisations/create`, {
          email,
        })
        .then((response) => response.data),
  })
}
