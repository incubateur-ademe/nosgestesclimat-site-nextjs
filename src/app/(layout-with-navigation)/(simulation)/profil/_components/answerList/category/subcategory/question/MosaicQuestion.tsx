'use client'

import ChoicesValue from '@/components/misc/ChoicesValue'
import NumberValue from '@/components/misc/NumberValue'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'

type Props = {
  question: DottedName
  isMissing: boolean
}

export default function MosaicQuestion({ question, isMissing }: Props) {
  const { t } = useClientTranslation()
  const { value, displayValue, unit, type, parent } = useRule(question)
  const { title, icons } = useRule(parent)

  return (
    <span className="relative flex justify-between rounded-xl bg-primary-100 p-4 text-sm">
      <span className="flex-1">
        {icons} {title}
      </span>
      {!isMissing ? (
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
      ) : null}
    </span>
  )
}
