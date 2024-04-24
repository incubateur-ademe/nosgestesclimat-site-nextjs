import { useRule } from '@/publicodes-state'

import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import { useEffect, useRef } from 'react'

type Props = {
  question: string
  assistance: string
  setTempValue?: (value: number | undefined) => void
}

export default function Assistance({
  question,
  assistance,
  setTempValue,
}: Props) {
  const { setValue: setValueOfQuestion, value: valueOfQuestion } =
    useRule(question)

  const {
    type,
    label,
    description,
    unit,
    numericValue: numericValueOfAssistance,
    setValue: setValueOfAssistance,
    parent,
  } = useRule(assistance)

  const { numericValue: numericValueOfParent } = useRule(parent)

  // If the assistance value changed and it is not synced with the question value
  // we update the question value (and the tempValue of the input)
  const prevNumericValueOfParent = useRef(numericValueOfParent)
  useEffect(() => {
    if (
      numericValueOfParent !== valueOfQuestion &&
      prevNumericValueOfParent.current !== numericValueOfParent
    ) {
      setValueOfQuestion(numericValueOfParent, { foldedStep: question })
      if (setTempValue) {
        setTempValue(numericValueOfParent)
      }
    }
    prevNumericValueOfParent.current = numericValueOfParent
  }, [
    numericValueOfParent,
    valueOfQuestion,
    setValueOfQuestion,
    setTempValue,
    question,
  ])

  return (
    <div className="mb-4 w-[20rem] max-w-full rounded-xl bg-white p-4 sm:w-2/3">
      <Label
        question={question}
        size="sm"
        label={label}
        description={description}
        titleClassName="text-sm md:text-base font-normal"
        className="mb-2"
      />
      {type === 'number' && (
        <NumberInput
          unit={unit ? unit.split('/')[0] : ''}
          value={numericValueOfAssistance}
          setValue={setValueOfAssistance}
          isMissing={numericValueOfAssistance ? false : true}
        />
      )}
    </div>
  )
}
