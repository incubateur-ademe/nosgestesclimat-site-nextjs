import WaterFootprintResults from '@/components/results/waterFootprint/WaterFootprintResults'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { getUser } from '@/helpers/server/dal/user'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
import { notFound, redirect } from 'next/navigation'

export default async function SimulationPage({
  params,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats/eau'>) {
  const { simulationId, locale } = await params

  let simulationResult
  try {
    const user = await getUser()

    simulationResult = await getSimulationResult({ user, simulationId: '' })

    if (simulationResult.progression !== 1) {
      redirect(SIMULATOR_PATH)
    }
  } catch {
    notFound()
  }

  return (
    <WaterFootprintResults
      simulationId={simulationId}
      simulationResult={simulationResult}
      locale={locale as Locale}
    />
  )
}
