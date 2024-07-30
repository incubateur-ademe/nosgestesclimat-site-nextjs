import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useSendVerificationCode(emailKey: string) {
  return useMutation({
    mutationKey: ['send-verification-code', emailKey],
    mutationFn: (email: string) =>
      axios
        .post(`${SERVER_URL}/organisations/send-verification-code`, {
          email,
        })
        .then((response) => response.data),
  })
}
