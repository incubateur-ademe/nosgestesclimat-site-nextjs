import { useFormState, useRule } from '@/publicodes-state'

import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
} from '@/helpers/getCategoryColorClass'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  assistance: DottedName
  setTempValue?: (value: number | undefined) => void
  setDisplayedValue?: (value: string | undefined) => void
}

export default function Assistance({
  question,
  assistance,
  setTempValue,
  setDisplayedValue,
}: Props) {
  const { setValue: setValueOfQuestion, value: valueOfQuestion } =
    useRule(question)

  const { currentCategory } = useFormState()

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
      setValueOfQuestion(numericValueOfParent, { questionDottedName: question })
      if (setTempValue) {
        setTempValue(numericValueOfParent)
      }
      if (setDisplayedValue) {
        setDisplayedValue(String(numericValueOfParent))
      }
    }
    prevNumericValueOfParent.current = numericValueOfParent
  }, [
    numericValueOfParent,
    valueOfQuestion,
    setValueOfQuestion,
    setTempValue,
    question,
    setDisplayedValue,
  ])

  return (
    <div
      className={twMerge(
        'mb-4 w-[20rem] max-w-full rounded-xl border-2 p-4 sm:w-2/3',
        getBgCategoryColor(currentCategory, '50'),
        getBorderCategoryColor(currentCategory, '200')
      )}>
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
