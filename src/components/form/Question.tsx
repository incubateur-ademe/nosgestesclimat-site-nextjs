import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import Notification from '@/components/form/question/Notification'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
}

const NUMBER_INPUT_MIN = 0

export default function Question({ question }: Props) {
  const {
    type,
    label,
    description,
    unit,
    value,
    numericValue,
    setValue,
    isMissing,
    choices,
    assistance,
    activeNotifications,
  } = useRule(question)

  const {
    setIsNavigationToNextQuestionDisabled,
    isNavigationToNextQuestionDisabled,
  } = useForm()

  return (
    <>
      <div className="mb-4">
        <Label question={question} label={label} description={description} />
        <Suggestions question={question} />
        {type === 'number' && (
          <NumberInput
            unit={unit}
            value={numericValue}
            setValue={(value) => {
              if (value <= NUMBER_INPUT_MIN) {
                setIsNavigationToNextQuestionDisabled(true)
              } else if (isNavigationToNextQuestionDisabled) {
                setIsNavigationToNextQuestionDisabled(false)
              }

              setValue(
                value < NUMBER_INPUT_MIN ? NUMBER_INPUT_MIN : value,
                question
              )
            }}
            isMissing={isMissing}
            min={0}
          />
        )}
        {type === 'boolean' && (
          <BooleanInput
            value={value}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
          />
        )}
        {type === 'choices' && (
          <ChoicesInput
            question={question}
            choices={choices}
            value={String(value)}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
          />
        )}
        {type === 'mosaic' && <Mosaic question={question} />}
      </div>
      {assistance ? (
        <Assistance question={question} assistance={assistance} />
      ) : null}
      {activeNotifications.map((notification) => (
        <Notification key={notification} notification={notification} />
      ))}
    </>
  )
}
