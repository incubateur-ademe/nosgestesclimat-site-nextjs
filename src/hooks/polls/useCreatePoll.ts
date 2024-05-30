import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  organisationId: string
  name: string
  defaultAdditionalQuestions: string[]
  customAdditionalQuestions: { question: string; isEnabled: boolean }[]
}

export function useCreatePoll() {
  const { user } = useUser()

  return useMutation({
    mutationKey: ['createPoll'],
    mutationFn: ({
      organisationId,
      name,
      defaultAdditionalQuestions,
      customAdditionalQuestions,
    }: Props) =>
      axios
        .post(
          `${SERVER_URL}/polls/create`,
          {
            organisationId,
            name,
            defaultAdditionalQuestions,
            customAdditionalQuestions,
            email: user?.organisation?.administratorEmail ?? '',
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
