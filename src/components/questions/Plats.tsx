import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
import { useEngine } from '@/publicodes-state'

export default function Plats() {
  const { getNumericValue } = useEngine()

  const totalNumberOfPlats = getNumericValue('ui . nombre de repas par semaine')

  return (
    <>
      <Question question={'alimentation . plats'} />
      <div className="text-center text-sm">
        {totalNumberOfPlats < 10 ? (
          <span className="text-red-700">
            <Trans>
              Moins de 10 repas par semaine, quel appétit de moineau
            </Trans>{' '}
            🐦
          </span>
        ) : null}
        {totalNumberOfPlats > 18 ? (
          <span className="text-red-700">
            <Trans>Plus de 18 repas par semaine, quel appétit</Trans> 💪
          </span>
        ) : null}
        {totalNumberOfPlats >= 10 && totalNumberOfPlats <= 18 ? (
          <div className="mb-2 text-center">
            <Trans>Miam</Trans> 😋
          </div>
        ) : null}
      </div>
    </>
  )
}
