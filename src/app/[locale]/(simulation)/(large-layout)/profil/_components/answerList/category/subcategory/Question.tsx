'use client'

import Link from '@/components/Link'
import ChoicesValue from '@/components/misc/ChoicesValue'
import NumberValue from '@/components/misc/NumberValue'
import { profilClickQuestion } from '@/constants/tracking/pages/profil'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import MosaicQuestion from './question/MosaicQuestion'

type Props = {
  question: DottedName
}

export default function Question({ question }: Props) {
  const { t } = useClientTranslation()
  const {
    label,
    value,
    displayValue,
    unit,
    type,
    questionsOfMosaicFromParent,
    isMissing,
  } = useRule(question)

  return (
    <Link
      href={getLinkToSimulateur({ question })}
      onClick={() => trackEvent(profilClickQuestion(question))}
      className={`mb-2 block rounded-xl bg-white p-4 no-underline hover:underline`}>
      <span
        className={`flex w-full items-center justify-between gap-8 text-sm`}>
        <span className="flex-1">{label}</span>
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
      {questionsOfMosaicFromParent.length ? (
        <ul
          role="list"
          className="mt-2 grid list-none gap-2 p-0 md:grid-cols-2">
          {questionsOfMosaicFromParent.map((questionOfMosaic) => (
            <li key={questionOfMosaic} className="list-none">
              <MosaicQuestion
                question={questionOfMosaic}
                isMissing={isMissing}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  )
}
