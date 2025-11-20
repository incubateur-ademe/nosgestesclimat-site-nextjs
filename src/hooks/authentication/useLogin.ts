import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'

export default function useLogin() {
  const {
    user: { userId },
  } = useUser()
  const locale = useLocale()

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      axios
        .post(
          `/api/auth`,
          {
            code,
            email,
            userId,
          },
          {
            params: {
              locale,
            },
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
