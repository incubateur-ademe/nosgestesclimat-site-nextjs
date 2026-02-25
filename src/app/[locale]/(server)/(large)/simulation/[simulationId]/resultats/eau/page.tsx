import WaterFootprintResults from '@/components/results/WaterFootprintResults'
import { USER_ID_COOKIE_NAME } from '@/constants/authentication/cookie'
import { getUserOrNull } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function SimulationPage({
  params,
  searchParams,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats/eau'>) {
  const { simulationId, locale } = await params
  const { userId: userIdParam } = await searchParams

  const user = await getUserOrNull()

  // If not authenticated, we try to get the userId from the cookie or searchParams
  const userId =
    user?.id ??
    (await cookies()).get(USER_ID_COOKIE_NAME)?.value ??
    (userIdParam as string)

  if (!userId) {
    notFound()
  }

  return (
    <WaterFootprintResults
      simulationId={simulationId}
      locale={locale as Locale}
      userId={userId}
    />
  )
}
