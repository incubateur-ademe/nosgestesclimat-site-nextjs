import { SERVER_URL } from '@/constants/urls'
import { Organisation } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Params = {
  ADMINISTRATOR_NAME: string
  ORGANISATION_NAME: string
  DASHBOARD_URL: string
}

type MutationFnProps = {
  organisation: Organisation
  administratorName: string
  email: string
}

type SendEmailOptions = {
  email: string
  templateId: number
  params: Params
}

export function useSendOrganisationCreationEmail() {
  return useMutation({
    mutationKey: ['sendOrganisationCreationEmail'],
    mutationFn: ({
      organisation,
      email,
      administratorName,
    }: MutationFnProps) => {
      const options: SendEmailOptions = {
        email,
        templateId: 70,
        params: {
          ADMINISTRATOR_NAME: administratorName,
          ORGANISATION_NAME: organisation?.name,
          DASHBOARD_URL: `${window.location.origin}/organisations/${organisation?.slug}`,
        },
      }
      return axios.post(`${SERVER_URL}/send-email`, options)
    },
  })
}
