import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import NewsletterManagement from '@/components/user/NewsletterManagement'
import { MON_ESPACE_SETTINGS_PATH } from '@/constants/urls/paths'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getUser } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { UserProvider } from '@/publicodes-state'
import { redirect } from 'next/navigation'

export default async function NewsletterManagementPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  const authentifiedUser = await getUser()

  if (authentifiedUser) {
    redirect(`${MON_ESPACE_SETTINGS_PATH}#infolettres`)
  }

  return (
    <div className="mb-12">
      <Title
        title={t(
          'newsletterManagement.title',
          'Sélectionnez les infolettres qui vous intéressent'
        )}
      />

      <QueryClientProviderWrapper>
        <UserProvider>
          <NewsletterManagement />
        </UserProvider>
      </QueryClientProviderWrapper>
    </div>
  )
}
