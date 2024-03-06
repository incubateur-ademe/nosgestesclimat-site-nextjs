import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
import { useEngine } from '@/publicodes-state'

const plats = [
  'alimentation . plats . poisson 1 . nombre',
  'alimentation . plats . poisson 2 . nombre',
  'alimentation . plats . viande 1 . nombre',
  'alimentation . plats . viande 2 . nombre',
  'alimentation . plats . végétalien . nombre',
  'alimentation . plats . végétarien . nombre',
]
export default function Plats() {
  const { getNumericValue } = useEngine()

  const totalNumberOfPlats = plats.reduce(
    (accumulator, currentValue) => accumulator + getNumericValue(currentValue),
    0
  )

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
