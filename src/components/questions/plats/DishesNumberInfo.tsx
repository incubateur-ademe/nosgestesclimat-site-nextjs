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
        {totalNumberOfPlats < 12 ? (
          <span className="text-red-700">
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <Trans>repas</Trans>
            </strong>{' '}
            <Trans>par semaine, quel appétit de moineau</Trans>
            <Emoji>🐦</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats > 16 ? (
          <span className="text-red-700">
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <Trans>repas</Trans>
            </strong>{' '}
            <Trans>par semaine, quel appétit !</Trans> <Emoji>💪</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats >= 12 && totalNumberOfPlats <= 16 ? (
          <span>
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <Trans>repas</Trans>
            </strong>{' '}
            <Trans>par semaine, miam</Trans> <Emoji>😋</Emoji>
          </span>
        ) : null}
      </div>
    </>
  )
}
