import ContentLarge from '@/components/layout/ContentLarge'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'
import InstructionsBanner from './_components/InstructionsBanner'
import LatestResults from './_components/LatestResults'
import ProfileTab from './_components/ProfileTabs'
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

      {!latestSimulation && <InstructionsBanner locale={locale} />}

      <ProfileTab locale={locale} activePath={MON_ESPACE_PATH} />

      <QueryClientProviderWrapper>
        <LatestResults locale={locale} simulation={latestSimulation} />
      </QueryClientProviderWrapper>
    </ContentLarge>
  )
}
