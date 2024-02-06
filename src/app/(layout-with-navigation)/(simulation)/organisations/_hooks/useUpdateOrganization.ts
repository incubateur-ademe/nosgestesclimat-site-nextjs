import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateOrganization({ email }: { email: string }) {
  return useMutation({
    mutationFn: ({
      name,
      administratorName,
      hasOptedInForCommunications,
      defaultAdditionalQuestions,
    }: {
      name?: string
      administratorName?: string
      hasOptedInForCommunications?: boolean
      defaultAdditionalQuestions?: string[]
    }) =>
      axios
        .post(
          `${SERVER_URL}/organizations/update`,
          {
            name,
            administratorName,
            hasOptedInForCommunications,
            email,
            defaultAdditionalQuestions,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
