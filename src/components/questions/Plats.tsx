import Question from '@/components/form/Question'
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
            Il vous reste {differenceToAverage} choix à faire
          </span>
        ) : null}
        {differenceToAverage < 0 ? (
          <span className="text-red-700">
            Vous avez fait {Math.abs(differenceToAverage)} choix en trop !
          </span>
        ) : null}
        {differenceToAverage === 0 ? <>😋👍</> : null}
      </div>
    </>
  )
}
