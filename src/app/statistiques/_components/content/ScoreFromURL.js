import TransClient from '@/components/translation/TransClient'
import { formatValue } from 'publicodes'
import { rehydrateDetails, sumFromDetails } from '../../../sites/publicodes/fin'
import Tile from '../utils/Tile'
import TotalChart from './TotalChart'

export default function ScoreFromURL(props) {
  if (!props.pages.length) return
  const scores = props.pages && getScores(props.pages)
  // we exclude high number of visits on same urls (corresponds to average test score ?)
  // pb : if a user goes to end page, come back to test, change test score, come back to end page, 2 score values are taken into account instead of one.
  const filteredScores = scores
    .slice(scores.findIndex((elt) => elt[1] < 50))
    .filter((elt) => elt[0] < 100000)
  const meanScore = weightedAverage(filteredScores)
  const roundedMeanScore = formatValue(meanScore / 1000)
  const flatScoreArray = filteredScores
    .map((elt) => [Array(elt[1]).fill(elt[0])])
    .flat()
    .flat()

  const totalVisits = flatScoreArray.length

  return (
    <div className="w-full text-center">
      <Tile>
        <TopBlock>
          <div className="text-3xl">
            {roundedMeanScore} <TransClient>tonnes</TransClient>{' '}
            <small>
              <TransClient>de CO₂e en moyenne</TransClient> ({totalVisits}{' '}
              <TransClient>simulations</TransClient>)
            </small>
          </div>

          <TotalChart flatScoreArray={flatScoreArray} />

          <p>
            <TransClient>
              Données valables pour les 30 derniers jours
            </TransClient>
          </p>
        </TopBlock>
      </Tile>
    </div>
  )
}

const getScores = (pages) => {
  const queryStringDetailsValuesRegexp = /[tasdln](\d*\.?[\d*$])+/g
  const endPagesWithDetailsParam = pages.filter(
    (page) => page.label.includes('fin') && page.label.includes('details=')
  )

  return endPagesWithDetailsParam
    .filter((obj) => {
      // We've got strange end page details sometimes. Here we got /fin?diapo=cfgebtbm&details=y55.07g0.57b5.23f4.88e4.46
      // No idea where it comes from
      const match = obj.label.match(queryStringDetailsValuesRegexp)
      if (!match) console.log('Problem with end page', obj)
      return match
    })
    .map((obj) => {
      const encodedDetails = obj.label
        .match(queryStringDetailsValuesRegexp)
        .join()
      const rehydratedDetails = rehydrateDetails(encodedDetails)
      const score = sumFromDetails(rehydratedDetails)
      return [score, obj.nb_visits]
    })
}

const weightedAverage = (score) => {
  const [sum, weightSum] = score.reduce(
    (acc, [value, weight]) => {
      acc[0] = acc[0] + value * weight
      acc[1] = acc[1] + weight
      return acc
    },
    [0, 0]
  )
  return sum / weightSum
}
