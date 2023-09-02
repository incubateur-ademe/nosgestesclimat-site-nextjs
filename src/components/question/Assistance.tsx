import { useRule } from '@/publicodes-state'
import { useMemo, useState } from 'react'

import Label from '@/components/question/Label'
import NumberInput from '@/components/question/NumberInput'

type Props = {
  question: string
  assistance: string
}

//TODO: Model shenanigans
export default function Assistance({ question, assistance }: Props) {
  const { setValue: setValueOfParent } = useRule(question)

  const parentRule = useMemo(() => {
    const dottedNameArray = question.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [question])

  const assistanceFullDottedName = parentRule + ' . ' + assistance

  const {
    type,
    label,
    description,
    unit,
    value: constantMultiplier,
  } = useRule(assistanceFullDottedName)

  const [inputValue, setInputValue] = useState(0)

  return (
    <div className="mb-2 w-2/3 bg-white p-4 rounded-lg">
      <Label size="sm" label={label} description={description} />
      {type === 'number' && (
        <NumberInput
          unit={unit.split('/')[0]}
          value={inputValue}
          setValue={(value: number) => {
            setValueOfParent(
              Math.round(12 * (value / constantMultiplier) * 10) / 10
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
