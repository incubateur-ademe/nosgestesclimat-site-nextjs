import { useRule } from '@/publicodes-state'
import { useState } from 'react'

import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'

type Props = {
  question: string
  assistance: string
}

//TODO: Model shenanigans
export default function Assistance({ question, assistance }: Props) {
  const { setValue: setValueOfParent, parent } = useRule(question)

  const assistanceFullDottedName = parent + ' . ' + assistance

  const {
    type,
    label,
    description,
    unit,
    value: constantMultiplier,
  } = useRule(assistanceFullDottedName)

  const [inputValue, setInputValue] = useState(0)

  return (
    <div className="mb-4 w-[20rem] max-w-full rounded-lg bg-white p-4 sm:w-2/3">
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
          value={inputValue}
          setValue={(value: number) => {
            setValueOfParent(
              Math.round(12 * (value / Number(constantMultiplier)) * 10) / 10,
              question
            )
            setInputValue(value)
          }}
          isMissing={inputValue ? false : true}
          size="sm"
        />
      )}
    </div>
  )
}
