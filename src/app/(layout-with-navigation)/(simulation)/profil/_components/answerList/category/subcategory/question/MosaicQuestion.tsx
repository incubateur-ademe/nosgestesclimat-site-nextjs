'use client'

import ChoicesValue from '@/components/misc/ChoicesValue'
import NumberValue from '@/components/misc/NumberValue'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'

type Props = { question: string }

export default function MosaicQuestion({ question }: Props) {
  const { t } = useClientTranslation()
  const { value, displayValue, unit, type, parent } = useRule(question)
  const { title, icons } = useRule(parent)

  return (
    <span className="bg-primary-100 relative flex justify-between rounded-lg p-4 text-sm">
      <span className="flex-1">
        {icons} {title}
      </span>
      <strong>
        {type === 'number' && (
          <NumberValue displayValue={displayValue} unit={unit} />
        )}
        {type === 'boolean' && (
          <span className="capitalize">{t(displayValue.toString())}</span>
        )}
        {type === 'choices' && (
          <ChoicesValue value={value} question={question} />
        )}
      </strong>
    </span>
  )
}
