import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateOrganization({
  administratorEmail,
}: {
  administratorEmail: string
}) {
  return useMutation({
    mutationFn: ({
      name,
      slug,
      administratorName,
      position,
      telephone,
      numberOfParticipants,
      hasOptedInForCommunications,
      additionalQuestions,
    }: {
      name: string
      slug: string
      administratorName: string
      position: string
      telephone: string
      numberOfParticipants: string
      hasOptedInForCommunications: boolean
      additionalQuestions: [string]
    }) =>
      axios
        .post(`${SERVER_URL}/organizations/update-after-creation`, {
          name,
          slug,
          administratorName,
          position,
          telephone,
          numberOfParticipants,
          hasOptedInForCommunications,
          administratorEmail,
          additionalQuestions,
        })
        .then((response) => response.data),
  })
}
