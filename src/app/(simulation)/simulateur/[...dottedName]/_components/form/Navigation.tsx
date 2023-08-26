import { useForm, useRule } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

import Button from '@/design-system/inputs/Button'

type Props = {
  question: string
}

export default function Form({ question }: Props) {
  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    noNextQuestionInCategory,
  } = useForm()
  const { isMissing } = useRule(question)

  const router = useRouter()
  return (
    <div className="flex justify-end  gap-4">
      <Button disabled={noPrevQuestion} onClick={gotoPrevQuestion}>
        ← Précédent
      </Button>
      <Button
        onClick={async () => {
          const nextQuestion = await gotoNextQuestion()
          console.log(nextQuestion)
          if (nextQuestion === 'end') {
            router.push('/fin')
          }
        }}>
        {noNextQuestion
          ? 'Terminer'
          : isMissing
          ? 'Je ne sais pas →'
          : noNextQuestionInCategory
          ? 'Next category →'
          : 'Suivant →'}
      </Button>
    </div>
  )
}
