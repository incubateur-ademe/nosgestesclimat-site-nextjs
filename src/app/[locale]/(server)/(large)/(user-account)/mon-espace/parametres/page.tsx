import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_SETTINGS_PATH } from '@/constants/urls/paths'
import Title from '@/design-system/layout/Title'
import type { DefaultPageProps } from '@/types'
import ProfileTab from '../_components/ProfileTabs'
import LocalisationSection from './_components/LocalisationSection'
import UserInfoSection from './_components/UserInfoSection'

export default async function SettingsPage({ params }: DefaultPageProps) {
  const { locale } = await params
  return (
    <div className="flex flex-col">
      <ProfileTab activePath={MON_ESPACE_SETTINGS_PATH} locale={locale} />

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

      <UserInfoSection locale={locale} />

      <QueryClientProviderWrapper>
        <LocalisationSection />
      </QueryClientProviderWrapper>
    </div>
  )
}
