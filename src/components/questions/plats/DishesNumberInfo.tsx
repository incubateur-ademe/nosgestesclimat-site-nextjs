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
              <NGCTrans>repas</NGCTrans>
            </strong>{' '}
            <NGCTrans>par semaine, quel appétit de moineau</NGCTrans>
            <Emoji>🐦</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats > 16 ? (
          <span className="text-red-700">
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <NGCTrans>repas</NGCTrans>
            </strong>{' '}
            <NGCTrans>par semaine, quel appétit !</NGCTrans> <Emoji>💪</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats >= 12 && totalNumberOfPlats <= 16 ? (
          <span>
            <strong>{totalNumberOfPlats}</strong>{' '}
            <strong>
              <NGCTrans>repas</NGCTrans>
            </strong>{' '}
            <NGCTrans>par semaine, miam</NGCTrans> <Emoji>😋</Emoji>
          </span>
        ) : null}
      </div>
    </>
  )
}
