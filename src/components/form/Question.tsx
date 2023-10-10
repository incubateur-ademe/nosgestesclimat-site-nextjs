import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import Notification from '@/components/form/question/Notification'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

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

  return (
    <>
      <div className="mb-4">
        <Label
          question={question}
          label={label}
          description={description}
          htmlFor={DEFAULT_FOCUS_ELEMENT_ID}
        />
        <Suggestions question={question} />
        {type === 'number' && (
          <NumberInput
            unit={unit}
            value={numericValue}
            setValue={(value) => {
              const limit = 0
              setValue(value < limit ? limit : value, question)
            }}
            isMissing={isMissing}
            min={0}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'boolean' && (
          <BooleanInput
            value={value}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'choices' && (
          <ChoicesInput
            question={question}
            choices={choices}
            value={String(value)}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
            id={DEFAULT_FOCUS_ELEMENT_ID}
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
