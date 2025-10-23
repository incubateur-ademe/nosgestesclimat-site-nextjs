import { VERIFICATION_CODE_URL } from '@/constants/urls/main'
import type { AuthenticationMode } from '@/types/authentication'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'

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
      mode?: AuthenticationMode
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
