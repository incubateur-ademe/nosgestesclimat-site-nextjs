import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  name?: string
  position?: string
  administratorName?: string
  hasOptedInForCommunications?: boolean
  defaultAdditionalQuestions?: string[]
  telephone?: string
  expectedNumberOfParticipants?: string
  organisationType?: string
}

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
      organisationType,
    }: Props) =>
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
            organisationType,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
  })
}
