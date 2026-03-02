import FinTabs from '@/components/results/FinTabs'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { carboneMetric } from '@/constants/model/metric'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import {
  getSimulationResult,
  getUserSimulations,
} from '@/helpers/server/model/simulations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import Trans from '../../translation/trans/TransServer'
import FootprintBlock from '../FootprintBlock'
import FootprintDetail from '../FootprintDetail'
import Objective from '../objective/Objective'
import SaveResultsBlock from '../SaveResultsBlock'
import type { Tendency } from '../TendencyIndicator'

interface Props {
  simulationId: string
  locale: Locale
  userId: string
}

const getTendency = ({
  previousCarbonFootprint,
  currentCarbonFootprint,
}: {
  previousCarbonFootprint?: number
  currentCarbonFootprint: number
}): Tendency => {
  if (
    !previousCarbonFootprint ||
    previousCarbonFootprint === currentCarbonFootprint
  )
    return undefined
  if (previousCarbonFootprint < currentCarbonFootprint) return 'increase'
  return 'decrease'
}

async function getCachedSimulationData({
  userId,
  simulationId,
  isAuthenticated,
}: {
  userId: string
  simulationId: string
  isAuthenticated: boolean
}) {
  'use cache'
  cacheLife('weeks')
  cacheTag(`simulation-${simulationId}`)

  const simulationResult = await getSimulationResult({ userId, simulationId })

  if (!simulationResult) notFound()

  let previousSimulation
  if (isAuthenticated) {
    const allUserSimulations = await getUserSimulations({ userId })

    previousSimulation = allUserSimulations.find(
      (simulation) =>
        new Date(simulation.date).getTime() <
          new Date(simulationResult.date).getTime() &&
        simulation.progression === 1
    )
  }

  return {
    tendency: getTendency({
      previousCarbonFootprint:
        previousSimulation?.computedResults.carbone.bilan,
      currentCarbonFootprint: simulationResult.computedResults.carbone.bilan,
    }),
    simulationResult,
  }
}

export default async function CarbonFootprintResults({
  simulationId,
  locale,
  userId,
}: Props) {
  const isAuthenticated = await isUserAuthenticated()

  const { simulationResult, tendency } = await getCachedSimulationData({
    userId,
    simulationId,
    isAuthenticated,
  })

  if (!simulationResult) notFound()

  if (simulationResult.progression !== 1) {
    redirect(SIMULATOR_PATH)
  }

  return (
    <>
      <FinTabs />

      <FootprintsLinks
        locale={locale}
        simulationId={simulationId}
        currentPage="carbone"
      />

      <div className="mb-12">
        <FootprintBlock
          locale={locale}
          value={simulationResult.computedResults.carbone.bilan}
          title={
            <Trans locale={locale} i18nKey="simulation.carbone.title">
              Vous émettez environ
            </Trans>
          }
          metric={carboneMetric}
          unitSuffix={
            <Trans locale={locale} i18nKey="common.co2eAn">
              CO₂e / an
            </Trans>
          }
          tendency={tendency}
        />
      </div>

      <FootprintDetail
        computedResults={simulationResult.computedResults}
        locale={locale}
        metric={carboneMetric}
      />

      <h2 className="title-lg mb-8">
        <Trans locale={locale} i18nKey="carbonResults.saveBlock.title">
          Retrouvez facilement vos résultats
        </Trans>
      </h2>

      <SaveResultsBlock locale={locale} isAuthentified={isAuthenticated} />

      <Objective
        locale={locale}
        carbonFootprint={simulationResult.computedResults.carbone.bilan}
      />

      <p className="text-primary-600 mx-auto mb-12 w-2xl max-w-full text-center">
        <Trans locale={locale} i18nKey="carbonResults.objective.description">
          <strong>Vous n’êtes pas seul. Chaque contexte est différent</strong>,{' '}
          on contribue à hauteur de ses possibilités, on veut vous y aider.
        </Trans>
      </p>
    </>
  )
}
