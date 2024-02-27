import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { AnswerType } from '@/types/quiz'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  answer: DottedName
  isAnswerCorrect: AnswerType
}
export function useSaveQuizAnswer() {
  const { getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { mutateAsync: saveQuizAnswer } = useMutation({
    mutationFn: ({ answer, isAnswerCorrect }: Props) => {
      return axios
        .post(SERVER_URL + '/quiz/answers/create', {
          answer,
          isAnswerCorrect,
          simulationId: currentSimulation?.id,
        })
        .then((response) => response.data)
        .catch(() => console.error('Failed to save quiz answer'))
    },
  })
  return {
    saveQuizAnswer,
  }
}
