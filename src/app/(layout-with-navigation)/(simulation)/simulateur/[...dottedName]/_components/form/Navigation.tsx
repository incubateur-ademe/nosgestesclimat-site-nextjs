import { useForm, useRule } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'

type Props = {
  question: string
}

export default function Navigation({ question }: Props) {
  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    gotoPrevCategory,
    gotoNextCategory,
    noPrevQuestion,
    noNextQuestion,
    noPrevCategory,
    noNextCategory,
  } = useForm()
  const { isMissing, setDefaultAsValue } = useRule(question)

  const router = useRouter()
  return (
    <div className="flex justify-end  gap-4">
      {!(noPrevQuestion && noPrevCategory) ? (
        <Button
          disabled={noPrevQuestion && noPrevCategory}
          onClick={() => {
            if (!noPrevQuestion) {
              gotoPrevQuestion()
              return
            }
            if (!noPrevCategory) {
              gotoPrevCategory()
              return
            }
          }}
          color="text">
          <TransClient>← Précédent</TransClient>
        </Button>
      ) : null}
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        onClick={async () => {
          if (isMissing) {
            await setDefaultAsValue()
          }
          if (!noNextQuestion) {
            gotoNextQuestion()
            return
          }
          if (!noNextCategory) {
            gotoNextCategory()
            return
          }
          router.push('/fin')
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
