import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
  onComplete?: () => void
}

export default function Navigation({ question, onComplete = () => '' }: Props) {
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
          <Trans>← Précédent</Trans>
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

          onComplete()
        }}>
        <Trans>
          {noNextQuestion && noNextCategory
            ? 'Terminer'
            : isMissing
            ? 'Je ne sais pas →'
            : 'Suivant →'}
        </Trans>
      </Button>
    </div>
  )
}
