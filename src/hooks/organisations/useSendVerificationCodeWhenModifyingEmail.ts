import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  email: string
  previousEmail: string
}

export function useSendVerificationCodeWhenModifyingEmail(emailKey: string) {
  return useMutation({
    mutationKey: ['send-verification-code', emailKey],
    mutationFn: ({ email, previousEmail }: Props) =>
      axios
        .post(
          `${SERVER_URL}/organisations/send-verification-code-when-modifying-email`,
          {
            email,
            previousEmail,
          }
        )
        .then((response) => response.data),
  })
}
