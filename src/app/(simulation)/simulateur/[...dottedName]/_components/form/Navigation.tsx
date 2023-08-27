import { useForm, useRule } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

import TransClient from '@/components/translation/TransClient'
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
      <Button disabled={noPrevQuestion} onClick={gotoPrevQuestion} color="text">
        <TransClient>← Précédent</TransClient>
      </Button>
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        onClick={async () => {
          const nextQuestion = await gotoNextQuestion()
          if (nextQuestion === 'end') {
            router.push('/fin')
          }
        }}>
        <TransClient>
          {noNextQuestion
            ? 'Terminer'
            : isMissing
            ? 'Je ne sais pas →'
            : 'Suivant →'}
        </TransClient>
      </Button>
    </div>
  )
}
