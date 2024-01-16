import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateOrganization({ ownerEmail }: { ownerEmail: string }) {
  return useMutation({
    mutationFn: ({
      name,
      ownerName,
      hasOptedInForCommunications,
      additionalQuestions,
    }: {
      name?: string
      slug?: string
      ownerName?: string
      hasOptedInForCommunications?: boolean
      additionalQuestions?: string[]
    }) =>
      axios
        .post(`${SERVER_URL}/organizations/update`, {
          // Only used to find the organization, shouldn't be modified
          ownerEmail,
          name,
          ownerName,
          hasOptedInForCommunications,
          additionalQuestions,
        })
        .then((response) => response.data),
  })
}
