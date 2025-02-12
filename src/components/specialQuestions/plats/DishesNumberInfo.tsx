import Trans from '@/components/translation/Trans'
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
            <Trans locale={locale}>Vous avez sélectionné</Trans>{' '}
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <Trans locale={locale}>repas</Trans>
            </strong>{' '}
            <Trans locale={locale}>sur les 14 habituels</Trans>{' '}
            <Emoji>🍽️</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats === 14 ? (
          <span>
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <Trans locale={locale}>repas</Trans>
            </strong>{' '}
            <Trans locale={locale}>par semaine, miam</Trans> <Emoji>😋</Emoji>
          </span>
        ) : null}
      </div>
    </>
  )
}
