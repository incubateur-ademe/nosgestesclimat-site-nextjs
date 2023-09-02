import { useRule } from '@/publicodes-state'
import { useMemo } from 'react'

import Label from '@/components/question/Label'
import NumberInput from '@/components/question/NumberInput'

type Props = {
  question: string
  assistance: string
}

export default function Assistance({ question, assistance }: Props) {
  const parentRule = useMemo(() => {
    const dottedNameArray = question.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [question])

  const assistanceFullDottedName = parentRule + ' . ' + assistance

  const { type } = useRule(assistanceFullDottedName)

  return (
    <div className="mb-4 w-2/3 bg-white p-4 rounded-lg">
      <Label size="sm" question={assistanceFullDottedName} />
      {type === 'number' && (
        <NumberInput size="sm" question={assistanceFullDottedName} />
      )}
    </div>
  )
}
