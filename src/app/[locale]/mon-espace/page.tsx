import ContentLarge from '@/components/layout/ContentLarge'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import NoResultsView from './_components/NoResultsView'
import ResultsView from './_components/ResultsView'
import WelcomeBanner from './_components/WelcomeBanner'

export default async function MonEspacePage({
  params,
  searchParams,
}: DefaultPageProps) {
  const { locale } = await params
  const { [SHOW_WELCOME_BANNER_QUERY_PARAM]: showWelcomeBanner } =
    (await searchParams) || {}

  const authenticatedUser = await getIsUserAuthenticated()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  const simulations = await fetchUserSimulations({
    userId: authenticatedUser.id,
  })

  const latestSimulation = simulations?.[0]

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      {showWelcomeBanner && !!latestSimulation && (
        <WelcomeBanner locale={locale} />
      )}

      {!latestSimulation && <NoResultsView locale={locale} />}

      {latestSimulation && (
        <ResultsView locale={locale} simulation={latestSimulation} />
      )}
    </ContentLarge>
  )
}
