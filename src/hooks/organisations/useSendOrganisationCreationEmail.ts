import { SERVER_URL } from '@/constants/urls'
import { Organisation } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Params = {
  ADMINISTRATOR_NAME: string
  ORGANISATION_NAME: string
  SHARE_URL: string
}

type MutationFnProps = {
  organisation: Organisation
  administratorName: string
  email: string
}

export function useSendOrganisationCreationEmail() {
  return useMutation({
    mutationKey: ['sendOrganisationCreationEmail'],
    mutationFn: ({ organisation, email, administratorName }: MutationFnProps) =>
      axios.post(`${SERVER_URL}/send-email`, {
        email,
        templateId: 70,
        params: {
          ADMINISTRATOR_NAME: administratorName,
          ORGANISATION_NAME: organisation?.name,
          SHARE_URL: `${window.location.origin}/o/${organisation?.slug}/${organisation?.polls[0].slug}`,
        },
      } as {
        email: string
        templateId: number
        params: Params
      }),
  })
}
