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
            if (noPrevQuestion) {
              if (!noPrevCategory) {
                gotoPrevCategory()
              }
            } else {
              gotoPrevQuestion()
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
          if (noNextQuestion) {
            if (noNextCategory) {
              return router.push('/fin')
            } else {
              gotoNextCategory()
            }
          } else {
            gotoNextQuestion()
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
