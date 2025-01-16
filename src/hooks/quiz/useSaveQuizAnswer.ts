import { QUIZZ_ANSWER_URL } from '@/constants/urls'
import { useCurrentSimulation } from '@/publicodes-state'
import type { AnswerType } from '@/types/quiz'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
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
        .post(QUIZZ_ANSWER_URL, {
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
