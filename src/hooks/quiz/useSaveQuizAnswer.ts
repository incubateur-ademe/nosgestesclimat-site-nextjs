import { SERVER_URL } from '@/constants/urls'
import { useCurrentSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { AnswerType } from '@/types/quiz'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  answer: DottedName
  isAnswerCorrect: AnswerType
}
export function useSaveQuizAnswer() {
  const { id } = useCurrentSimulation()

  const { mutateAsync: saveQuizAnswer } = useMutation({
    mutationFn: ({ answer, isAnswerCorrect }: Props) => {
      return axios
        .post(SERVER_URL + '/quiz/answers/create', {
          answer,
          isAnswerCorrect,
          simulationId: id,
        })
        .then((response) => response.data)
    },
  })
  return {
    saveQuizAnswer,
  }
}
