import SimulationResults from '@/components/results/SimulationResults'
import { getUser } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'

export default async function SimulationPage({
  params,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  const { simulationId, locale } = await params

  const user = await getUser()

  return (
    <SimulationResults
      simulationId={simulationId}
      locale={locale as Locale}
      userId={user?.id || ''}
    />
  )
}
