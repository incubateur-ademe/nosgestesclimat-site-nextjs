import SimulateurSkeleton from '@/app/[locale]/(simulation)/simulateur/[root]/skeleton'
import { getUserSimulations } from '@/helpers/server/model/simulations'
import { getUser } from '@/helpers/server/model/user'
import { redirect } from 'next/navigation'
import SimulationResolverFallback from './_components/SimulationResolverFallback'

export default async function SimulationResultatsResolverPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Try to get the user from the session
  let user

  try {
    // Always returns a user or throws an error
    user = await getUser()
  } catch {
    user = null
  }

  if (user) {
    // If authenticated, get their simulations
    const simulations = await getUserSimulations({ userId: user.id })

    if (simulations.length > 0) {
      // Redirect to the most recent one (getUserSimulations already returns them sorted by date)
      redirect(`/${locale}/simulation/${simulations[0].id}/resultats`)
    }
  }

  // If not authenticated or no simulations on server, fallback to client-side (localStorage)
  return (
    <>
      {/* We show a skeleton while the client-side redirection is happening to avoid a flash of white */}
      <SimulateurSkeleton />

      <SimulationResolverFallback locale={locale} />
    </>
  )
}
