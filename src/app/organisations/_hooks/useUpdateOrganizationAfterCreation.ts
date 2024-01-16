import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

// This is a specific hook, called only once and only after the organization is created
// because we there set the slug which shouldn't be modified afterwards
export function useUpdateOrganizationAfterCreation({
  ownerEmail,
}: {
  ownerEmail: string
}) {
  return useMutation({
    mutationFn: ({
      name,
      slug,
      ownerName,
      position,
      telephone,
      numberOfParticipants,
      hasOptedInForCommunications,
    }: {
      name: string
      slug: string
      ownerName: string
      position: string
      telephone: string
      numberOfParticipants: string
      hasOptedInForCommunications: boolean
    }) =>
      axios
        .post(`${SERVER_URL}/organizations/update-after-creation`, {
          name,
          slug,
          ownerName,
          position,
          telephone,
          numberOfParticipants,
          hasOptedInForCommunications,
          ownerEmail,
        })
        .then((response) => response.data),
  })
}
