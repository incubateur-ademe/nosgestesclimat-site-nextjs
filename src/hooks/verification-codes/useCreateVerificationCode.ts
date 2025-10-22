import { VERIFICATION_CODE_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'

export type Mode = 'signIn' | 'signUp'

export function useCreateVerificationCode() {
  const locale = useLocale()

  return useMutation({
    mutationFn: ({
      email,
      userId,
      mode,
    }: {
      email: string
      userId: string
      mode?: Mode
    }) =>
      axios
        .post(
          `${VERIFICATION_CODE_URL}${mode ? `?mode=${mode}` : ''}`,
          {
            email,
            userId,
          },
          {
            params: { locale },
          }
        )
        .then((response) => response.data),
  })
}
