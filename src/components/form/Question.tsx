import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
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
  } = useRule(question)

  return (
    <>
      <div className="mb-4">
        <Label label={label} description={description} />
        <Suggestions question={question} />
        {type === 'number' && (
          <NumberInput
            unit={unit}
            value={numericValue}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
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
    </>
  )
}
