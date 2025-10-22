import { CHECK_USER_EXISTS_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function useCheckUserExists() {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      axios
        .get(CHECK_USER_EXISTS_URL, {
          params: {
            email,
          },
        })
        .then((response) => response.data),
  })
}
