'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'

export default function DishesNumberInfo() {
  const { numericValue: totalNumberOfPlats } = useRule(
    'ui . nombre de repas par semaine'
  )

  return (
    <>
      <div aria-live="polite" className="mb-2 text-center text-sm">
        {totalNumberOfPlats !== 14 ? (
          <span className="text-red-700">
            <TransClient>Vous avez sélectionné</TransClient>{' '}
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <TransClient>repas</TransClient>
            </strong>{' '}
            <TransClient>sur les 14 habituels</TransClient> <Emoji>🍽️</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats === 14 ? (
          <span>
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <TransClient>repas</TransClient>
            </strong>{' '}
            <TransClient>par semaine, miam</TransClient> <Emoji>😋</Emoji>
          </span>
        ) : null}
      </div>
    </>
  )
}
