import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/trans/TransServer'
import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import ProfileTab from './_components/ProfileTabs'

export default async function MonEspacePage({ params }: DefaultPageProps) {
  const { locale } = await params

  const authenticatedUser = await getIsUserAuthenticated()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      <div className="flex flex-col">
        <h1 className="sr-only mb-6 text-2xl font-bold">
          <Trans i18nKey="mon-espace.title" locale={locale}>
            Mon espace
          </Trans>
        </h1>

        <ProfileTab locale={locale} activePath={MON_ESPACE_PATH} />
      </div>
    </ContentLarge>
  )
}
