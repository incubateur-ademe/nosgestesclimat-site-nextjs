import { AUTHENTICATION_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function useLogin() {
  const {
    user: { userId },
  } = useUser()
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      axios
        .post(
          `${AUTHENTICATION_URL}/login`,
          {
            code,
            email,
            userId,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
