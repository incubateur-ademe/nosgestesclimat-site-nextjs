import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import { useEngine } from '@/publicodes-state'

export default function Plats() {
  const { getNumericValue } = useEngine()

  const totalNumberOfPlats = getNumericValue('ui . nombre de repas par semaine')

  return (
    <>
      <Question question={'alimentation . plats'} />
      <div aria-live="polite" className="mb-2 text-center text-sm">
        {totalNumberOfPlats < 12 ? (
          <span className="text-red-700">
            <b>{totalNumberOfPlats} </b>
            <Trans>
              <b>repas </b>par semaine, quel appétit de moineau
            </Trans>{' '}
            <Emoji>🐦</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats > 16 ? (
          <span className="text-red-700">
            <b>{totalNumberOfPlats} </b>
            <Trans>
              <b>repas</b> par semaine, quel appétit
            </Trans>{' '}
            <Emoji>💪</Emoji>
          </span>
        ) : null}
        {totalNumberOfPlats >= 12 && totalNumberOfPlats <= 16 ? (
          <span>
            <b>{totalNumberOfPlats} </b>
            <Trans>
              <b>repas </b>par semaine, miam
            </Trans>{' '}
            <Emoji>😋</Emoji>
          </span>
        ) : null}
      </div>
    </>
  )
}
