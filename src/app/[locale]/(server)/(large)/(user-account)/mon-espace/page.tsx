import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { getUserSimulations } from '@/helpers/server/model/simulations'
import { getAuthUser } from '@/helpers/server/model/user'
import type { DefaultPageProps } from '@/types'
import { notFound } from 'next/navigation'
import NoResultsView from './_components/NoResultsView'
import ResultsView from './_components/ResultsView'
import WelcomeBanner from './_components/WelcomeBanner'

export default async function Page({ params, searchParams }: DefaultPageProps) {
  const { locale } = await params
  const { [SHOW_WELCOME_BANNER_QUERY_PARAM]: showWelcomeBanner } =
    (await searchParams) ?? {}

  let simulations
  let latestSimulation
  try {
    const user = await getAuthUser()

    simulations = await getUserSimulations({
      userId: user.id,
    })

    latestSimulation = simulations.length > 0 ? simulations[0] : undefined
  } catch {
    notFound()
  }

  return (
    <>
      {showWelcomeBanner && !!latestSimulation && (
        <WelcomeBanner locale={locale} />
      )}
      {!latestSimulation && <NoResultsView locale={locale} />}
      {latestSimulation && (
        <ResultsView locale={locale} simulations={simulations} />
      )}
    </>
  )
}
