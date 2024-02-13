import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useCreateOrganisation() {
  return useMutation({
    mutationFn: ({ administratorEmail }: { administratorEmail: string }) =>
      axios
        .post(`${SERVER_URL}/organisations/create`, {
          administratorEmail,
        })
        .then((response) => response.data),
  })
}
