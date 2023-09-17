import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useForm, useRule } from '@/publicodes-state'
import { useState } from 'react'

type Props = {
  question: string
  onComplete?: () => void
}

export default function Navigation({ question, onComplete = () => '' }: Props) {
  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isLastQuestionOfCategory,
  } = useForm()
  const { isMissing, setDefaultAsValue } = useRule(question)
  const [isSettingDefaultValue, setIsSettingDefaultValue] = useState(false)
  return (
    <div className="flex justify-end  gap-4">
      {!noPrevQuestion ? (
        <Button
          disabled={isSettingDefaultValue}
          onClick={() => {
            if (!noPrevQuestion) {
              gotoPrevQuestion()
              return
            }
          }}
          color="text">
          <Trans>← Précédent</Trans>
        </Button>
      ) : null}
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        disabled={isSettingDefaultValue}
        onClick={async () => {
          setIsSettingDefaultValue(true)
          await setDefaultAsValue(question)
          setIsSettingDefaultValue(false)
          if (isLastQuestionOfCategory) {
            console.log('Category Change')
          }
          if (!noNextQuestion) {
            gotoNextQuestion()
            return
          }
          onComplete()
        }}>
        <Trans>
          {noNextQuestion
            ? 'Terminer'
            : isMissing
            ? 'Je ne sais pas →'
            : 'Suivant →'}
        </Trans>
      </Button>
    </div>
  )
}
