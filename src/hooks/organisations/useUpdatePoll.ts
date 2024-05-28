import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { CustomAdditionalQuestions } from './../../types/organisations'

type Props = {
  name: string
  defaultAdditionalQuestions: string[]
  customAdditionalQuestions: CustomAdditionalQuestions
}

export function useUpdatePoll(pollSlug: string) {
  return useMutation({
    mutationKey: ['updatePoll', pollSlug],
    mutationFn: ({
      name,
      defaultAdditionalQuestions,
      customAdditionalQuestions,
    }: Props) =>
      axios
        .post('/api/polls/update', {
          pollSlug,
          name,
          defaultAdditionalQuestions,
          customAdditionalQuestions,
        })
        .then((res) => res.data),
  })
}
