import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  email: string
  name?: string
  position?: string
  administratorName?: string
  hasOptedInForCommunications?: boolean
  defaultAdditionalQuestions?: string[]
  administratorTelephone?: string
  expectedNumberOfParticipants?: string
  organisationType?: string
  numberOfCollaborators?: number
}

export function useUpdateOrganisation({ email }: { email: string }) {
  return useMutation({
    mutationFn: ({
      email: emailModified,
      name,
      position,
      administratorName,
      hasOptedInForCommunications,
      defaultAdditionalQuestions,
      administratorTelephone,
      expectedNumberOfParticipants,
      organisationType,
      numberOfCollaborators,
    }: Props) =>
      axios
        .post(
          `${SERVER_URL}/organisations/update`,
          {
            name,
            administratorName,
            hasOptedInForCommunications,
            email,
            emailModified,
            defaultAdditionalQuestions,
            position,
            administratorTelephone,
            expectedNumberOfParticipants,
            organisationType,
            numberOfCollaborators,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const organisation = response.data
          if (!organisation.slug) {
            throw new Error('Invalid response')
          }
          return organisation
        }),
  })
}
