import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/trans/TransServer'
import {
  CONNEXION_PATH,
  MON_ESPACE_SETTINGS_PATH,
} from '@/constants/urls/paths'
import Title from '@/design-system/layout/Title'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import QueryClientProviderWrapper from '../../_components/mainLayoutProviders/QueryClientProviderWrapper'
import ProfileTab from '../_components/ProfileTabs'
import LocalisationSection from './_components/LocalisationSection'
import UserInfosSection from './_components/UserInfosSection'

export default async function MonEspaceParametresPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params

  const authenticatedUser = await getIsUserAuthenticated()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      <div className="flex flex-col">
        <ProfileTab locale={locale} activePath={MON_ESPACE_SETTINGS_PATH} />

        <div className="mb-6 flex w-full items-start justify-between">
          <Title
            title={
              <span>
                <Trans locale={locale} i18nKey="mon-espace.settings.title">
                  Paramètres
                </Trans>
              </span>
            }
            className="mb-0"
          />
        </div>

        <UserInfosSection locale={locale} />

        <QueryClientProviderWrapper>
          <LocalisationSection />
        </QueryClientProviderWrapper>
      </div>
    </ContentLarge>
  )
}
