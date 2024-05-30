import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { CustomAdditionalQuestions } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  pollSlug: string
  orgaSlug: string
}

export function useUpdateCustomQuestions({ pollSlug, orgaSlug }: Props) {
  const { user } = useUser()

  return useMutation({
    mutationKey: ['updateCustomQuestions', pollSlug, orgaSlug],
    mutationFn: ({
      customAdditionalQuestions,
    }: {
      customAdditionalQuestions: CustomAdditionalQuestions[]
    }) =>
      axios
        .post(
          `${SERVER_URL}/polls/update-custom-questions`,
          {
            email: user?.organisation?.administratorEmail ?? '',
            pollSlug,
            orgaSlug,
            customAdditionalQuestions,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    retry: false,
  })
}
