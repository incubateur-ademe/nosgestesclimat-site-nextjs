import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  pollSlug: string
}

export function useUpdateCustomQuestions({ pollSlug }: Props) {
  return useMutation({
    mutationKey: ['updateCustomQuestions', pollSlug],
    mutationFn: ({
      customAdditionalQuestions,
    }: {
      customAdditionalQuestions: Record<string, boolean>
    }) =>
      axios
        .post('/organisations/update-custom-questions', {
          pollSlug: pollSlug,
          customAdditionalQuestions,
        })
        .then((res) => res.data),
    retry: false,
  })
}
