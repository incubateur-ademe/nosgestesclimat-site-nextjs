import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import CarbonFootprint from '@/components/results/CarbonFootprint'
import { getUser } from '@/helpers/server/model/user'
import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import type { Locale } from '@/i18nConfig'
import { notFound } from 'next/navigation'

export default async function SimulationPage({
  params,
}: LayoutProps<'/[locale]/simulation/[simulationId]'>) {
  const { simulationId, locale } = await params

  const user = await getUser()

  const simulation = await fetchSimulation({
    userId: user?.id || '',
    simulationId: simulationId as string,
  })

  if (!simulation) {
    notFound()
  }

  return (
    <div>
      <FinTabs />
      <CarbonFootprint
        locale={locale as Locale}
        value={simulation?.computedResults?.carbone?.bilan}
      />
    </div>
  )
}
