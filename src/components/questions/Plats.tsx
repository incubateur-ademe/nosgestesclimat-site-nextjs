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
  const differenceToAverage = 14 - totalNumberOfPlats
  return (
    <>
      <Question question={'alimentation . plats'} />
      <div className="text-center text-sm">
        {differenceToAverage > 0 ? (
          <span className="text-red-700">
            <Trans>Il vous reste</Trans> {differenceToAverage}{' '}
            <Trans>choix à faire</Trans>
          </span>
        ) : null}
        {differenceToAverage < 0 ? (
          <span className="text-red-700">
            <Trans>Vous avez fait</Trans> {Math.abs(differenceToAverage)}{' '}
            <Trans>choix en trop !</Trans>
          </span>
        ) : null}
        {differenceToAverage === 0 ? (
          <div className="mb-2 text-center">😋👍</div>
        ) : null}
      </div>
    </>
  )
}
