import Assistance from '@/components/question/Assistance'
import BooleanInput from '@/components/question/BooleanInput'
import ChoicesInput from '@/components/question/ChoicesInput'
import Label from '@/components/question/Label'
import Mosaic from '@/components/question/Mosaic'
import NumberInput from '@/components/question/NumberInput'
import Suggestions from '@/components/question/Suggestions'
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
            value={value}
            setValue={setValue}
            isMissing={isMissing}
          />
        )}
        {type === 'boolean' && (
          <BooleanInput
            value={value}
            setValue={setValue}
            isMissing={isMissing}
          />
        )}
        {type === 'choices' && (
          <ChoicesInput
            choices={choices}
            value={value}
            setValue={setValue}
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
