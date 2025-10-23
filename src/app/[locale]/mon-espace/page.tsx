import ContentLarge from '@/components/layout/ContentLarge'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { redirect } from 'next/navigation'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'
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

  const { t } = await getServerTranslation({ locale })

  const authenticatedUser = await getIsUserAuthenticated()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      {showWelcomeBanner && <WelcomeBanner locale={locale} />}

      <ProfileTab locale={locale} activePath={MON_ESPACE_PATH} />

      <UserProvider migrationInstructions={migrationInstructions}>
        <QueryClientProviderWrapper>
          <LatestResults locale={locale} />
        </QueryClientProviderWrapper>
      </UserProvider>
    </ContentLarge>
  )
}
