import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function useValidateVerificationCode({
  ownerEmail,
}: {
  ownerEmail: string
}) {
  return useMutation({
    mutationFn: ({ verificationCode }: { verificationCode: string }) =>
      axios
        .post(
          `${SERVER_URL}/organizations/validate-verification-code`,
          {
            ownerEmail,
            verificationCode,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
