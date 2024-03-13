import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useCreateOrganisation() {
  return useMutation({
    mutationFn: ({ email, userId }: { email: string; userId: string }) =>
      axios
        .post(`${SERVER_URL}/organisations/create`, {
          email,
          userId,
        })
        .then((response) => response.data),
  })
}
