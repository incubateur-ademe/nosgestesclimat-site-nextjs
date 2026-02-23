import WaterFootprintResults from '@/components/results/WaterFootprintResults'
import { getUser } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { notFound } from 'next/navigation'

export default async function SimulationPage({
  params,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats/eau'>) {
  const { simulationId, locale } = await params

  const user = await getUser()

  if (!user) {
    notFound()
  }

  return (
    <WaterFootprintResults
      simulationId={simulationId}
      locale={locale as Locale}
      userId={user?.id || ''}
    />
  )
}
