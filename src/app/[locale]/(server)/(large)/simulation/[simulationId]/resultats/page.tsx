import SimulationResults from '@/components/results/SimulationResults'
import { getUser } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { notFound } from 'next/navigation'

export default async function SimulationPage({
  params,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  const { simulationId, locale } = await params

  let user

  try {
    // Always returns a user or throws an error
    user = await getUser()
  } catch {
    user = null
  }

  if (!user) {
    notFound()
  }

  return (
    <SimulationResults
      simulationId={simulationId}
      locale={locale as Locale}
      userId={user.id}
    />
  )
}
