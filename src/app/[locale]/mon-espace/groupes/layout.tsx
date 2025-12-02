import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_GROUPS_PATH } from '@/constants/urls/paths'
import ProfileTab from '../_components/ProfileTabs'

/*global LayoutProps*/

export default async function MonEspaceGroupesPage({
  params,
  children,
}: LayoutProps<'/[locale]/mon-espace/groupes'>) {
  const { locale } = await params

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      <div className="flex flex-col">
        <h1 className="sr-only mb-6 text-2xl font-bold">
          <Trans i18nKey="mon-espace.groups.title" locale={locale}>
            Mes groupes
          </Trans>
        </h1>

        <ProfileTab activePath={MON_ESPACE_GROUPS_PATH} />
        {children}
      </div>
    </ContentLarge>
  )
}
