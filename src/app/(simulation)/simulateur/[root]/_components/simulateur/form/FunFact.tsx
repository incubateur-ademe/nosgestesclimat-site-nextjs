'use client'

import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useForm } from '@/publicodes-state'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question: DottedName
}

export default function FunFact({ question }: Props) {
  const { currentCategory } = useForm()

  if (question !== 'logement . âge') return null

  return (
    <div
      className={`rounded-xl border-2 ${getBorderCategoryColor(currentCategory, '200')} ${getBgCategoryColor(currentCategory, '100')} px-4 py-6 text-sm`}>
      <h3 className="mb-2">
        <Emoji>💡</Emoji> Le saviez vous ?
      </h3>
      <p className="mb-0">
        <Trans>
          <strong>
            La taille des logements français a très fortement augmenté
          </strong>{' '}
          sur ces 50 dernirèes années, passant de 23 à 40,4 m² par habitant,
          soit{' '}
          <strong>90,9 m² en moyenne pour un foyer de 2,2 personnes.</strong>
        </Trans>
      </p>
    </div>
  )
}
