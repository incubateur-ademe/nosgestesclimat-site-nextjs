import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  email: string
  emailModified: string
  name?: string
  position?: string
  administratorName?: string
  hasOptedInForCommunications?: boolean
  defaultAdditionalQuestions?: string[]
  administratorTelephone?: string
  expectedNumberOfParticipants?: string
  organisationType?: string
  numberOfCollaborators?: number
  verificationCode: string
}

/**
 * This hook is used to modify the email of an organisation administrator
 */
export function useVerifyCodeAndUpdate() {
  return useMutation({
    mutationKey: ['verify-and-update'],
    mutationFn: ({
      email,
      emailModified,
      name,
      position,
      administratorName,
      hasOptedInForCommunications,
      administratorTelephone,
      organisationType,
      numberOfCollaborators,
      verificationCode,
    }: Props) =>
      axios
        .post(
          `${SERVER_URL}/organisations/verify-and-update`,
          {
            email,
            emailModified,
            name,
            position,
            administratorName,
            hasOptedInForCommunications,
            administratorTelephone,
            organisationType,
            numberOfCollaborators,
            verificationCode,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
