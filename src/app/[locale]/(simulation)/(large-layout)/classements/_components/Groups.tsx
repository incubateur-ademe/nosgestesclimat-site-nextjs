import Trans from '@/components/translation/trans/TransServer'
import Title from '@/design-system/layout/Title'
import type { Locale } from '@/i18nConfig'
import type { Group } from '@/types/groups'
import GroupContent from './groups/GroupContent'

type Props = {
  groups: Group[]
  locale: Locale
}

export default function Groups({ groups, locale }: Props) {
  return (
    <>
      <Title
        tag="h2"
        title={
          <Trans locale={locale} i18nKey="mon-espace.groups.title">
            Mes groupes "Amis" et "Famille"
          </Trans>
        }
      />
      <GroupContent groups={groups} />
    </>
  )
}
