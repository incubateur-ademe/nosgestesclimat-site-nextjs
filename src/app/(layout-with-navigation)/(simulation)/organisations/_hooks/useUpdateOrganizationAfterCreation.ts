import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

// This is a specific hook, called only once and only after the organization is created
// because we there set the slug which shouldn't be modified afterwards
export function useUpdateOrganizationAfterCreation({
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
    }: {
      name: string
      slug: string
      administratorName: string
      position: string
      telephone: string
      numberOfParticipants: string
      hasOptedInForCommunications: boolean
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
        })
        .then((response) => response.data),
  })
}
