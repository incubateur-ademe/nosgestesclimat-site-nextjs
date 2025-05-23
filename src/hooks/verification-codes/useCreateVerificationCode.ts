import { VERIFICATION_CODE_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useCreateVerificationCode() {
  return useMutation({
    mutationFn: ({ email, userId }: { email: string; userId: string }) =>
      axios
        .post(VERIFICATION_CODE_URL, {
          email,
          userId,
        })
        .then((response) => response.data),
  })
}
