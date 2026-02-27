import FinTabs from '@/components/results/FinTabs'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { carboneMetric } from '@/constants/model/metric'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { getSimulationResult } from '@/helpers/server/model/simulations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import Trans from '../../translation/trans/TransServer'
import FootprintBlock from '../FootprintBlock'
import FootprintDetail from '../FootprintDetail'
import SaveResultsBlock from '../SaveResultsBlock'
import Objective from '../objective/Objective'

interface Props {
  simulationId: string
  locale: Locale
  userId: string
}

async function getCachedSimulationResult({
  userId,
  simulationId,
}: {
  userId: string
  simulationId: string
}) {
  'use cache'
  cacheLife('weeks')
  cacheTag(`simulation-${simulationId}`)

  return getSimulationResult({ userId, simulationId })
}

export default async function CarbonFootprintResults({
  simulationId,
  locale,
  userId,
}: Props) {
  const isAuthenticated = await isUserAuthenticated()

  const simulationResult = await getCachedSimulationResult({
    userId,
    simulationId,
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

      <div className="mb-12 flex flex-col gap-4 md:flex-row">
        <FootprintBlock
          className="flex-1"
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
        />
        <div className="bg-secondary-100 max-w-full flex-1 rounded-lg md:w-sm">
          Placeholder for fun facts
        </div>
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
