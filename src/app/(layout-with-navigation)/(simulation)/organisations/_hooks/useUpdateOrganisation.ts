import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateOrganisation({ email }: { email: string }) {
  return useMutation({
    mutationFn: ({
      slug,
      name,
      position,
      administratorName,
      hasOptedInForCommunications,
      defaultAdditionalQuestions,
      telephone,
      numberOfExpectedParticipants,
    }: {
      slug?: string
      name?: string
      position?: string
      administratorName?: string
      hasOptedInForCommunications?: boolean
      defaultAdditionalQuestions?: string[]
      telephone?: string
      numberOfExpectedParticipants?: string
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
            slug,
            telephone,
            numberOfExpectedParticipants,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
