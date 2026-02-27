import WaterFootprintResults from '@/components/results/waterFootprint/WaterFootprintResults'
import { getInitialUserId, getUser } from '@/helpers/server/dal/user'
import type { Locale } from '@/i18nConfig'
import { notFound } from 'next/navigation'

export default async function SimulationPage({
  params,
  searchParams,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats/eau'>) {
  const { simulationId, locale } = await params
  const { userId: userIdParam } = await searchParams

  const user = await getUser()

  // If not authenticated, we try to get the userId from the cookie or searchParams
  const userId =
    user?.id ?? (await getInitialUserId()) ?? (userIdParam as string)

  if (!userId) {
    notFound()
  }

  return (
    <WaterFootprintResults
      simulationId={simulationId as string}
      locale={locale as Locale}
      userId={userId}
    />
  )
}
