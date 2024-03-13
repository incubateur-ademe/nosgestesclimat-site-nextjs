import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function useValidateVerificationCode({
  email,
}: {
  email: string
}) {
  return useMutation({
    mutationFn: ({ verificationCode }: { verificationCode: string }) =>
      axios
        .post(
          `${SERVER_URL}/organisations/validate-verification-code`,
          {
            email,
            verificationCode,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
