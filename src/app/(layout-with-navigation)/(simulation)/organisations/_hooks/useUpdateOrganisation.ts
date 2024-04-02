import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateOrganisation({ email }: { email: string }) {
  return useMutation({
    mutationFn: ({
      name,
      position,
      administratorName,
      hasOptedInForCommunications,
      defaultAdditionalQuestions,
      telephone,
      expectedNumberOfParticipants,
    }: {
      name?: string
      position?: string
      administratorName?: string
      hasOptedInForCommunications?: boolean
      defaultAdditionalQuestions?: string[]
      telephone?: string
      expectedNumberOfParticipants?: string
    }) =>
      axios
        .post(
          `${SERVER_URL}/organisations/update`,
          {
            name,
            administratorName,
            hasOptedInForCommunications,
            email,
            defaultAdditionalQuestions,
            position,
            telephone,
            expectedNumberOfParticipants,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
