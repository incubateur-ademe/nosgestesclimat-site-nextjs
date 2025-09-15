import { VERIFICATION_CODE_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'

export function useCreateVerificationCode() {
  const locale = useLocale()

  return useMutation({
    mutationFn: ({ email, userId }: { email: string; userId: string }) =>
      axios
        .post(
          VERIFICATION_CODE_URL,
          {
            email,
            userId,
          },
          {
            params: {
              locale,
            },
          }
        )
        .then((response) => response.data),
  })
}
