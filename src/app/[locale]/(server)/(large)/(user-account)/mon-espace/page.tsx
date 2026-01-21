import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { getUser } from '@/helpers/server/model/user'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { DefaultPageProps } from '@/types'
import NoResultsView from './_components/NoResultsView'
import ResultsView from './_components/ResultsView'
import WelcomeBanner from './_components/WelcomeBanner'

export default async function Page({ params, searchParams }: DefaultPageProps) {
  const { locale } = await params
  const { [SHOW_WELCOME_BANNER_QUERY_PARAM]: showWelcomeBanner } =
    (await searchParams) ?? {}

  const user = await getUser()

  const simulations = await fetchUserSimulations({
    userId: user.id,
  })

  const latestSimulation = simulations?.[0]

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
