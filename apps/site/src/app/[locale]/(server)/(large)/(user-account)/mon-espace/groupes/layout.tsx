import UserSpaceTabs from '@/components/layout/UserSpaceTabs'
import Trans from '@/components/translation/trans/TransServer'

/*global LayoutProps*/

export default function MonEspaceGroupesPage({
  children,
}: LayoutProps<'/[locale]/mon-espace/groupes'>) {
  return (
    <div className="flex flex-col">
      <h1 className="sr-only mb-6 text-2xl font-bold">
        <Trans i18nKey="mon-espace.groups.title">Tests collections</Trans>
      </h1>

      <UserSpaceTabs isAuth />
      {children}
    </div>
  )
}
