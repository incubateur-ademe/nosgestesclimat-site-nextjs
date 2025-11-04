import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Groups from '@/components/groups/Groups'
import Organisations from '@/components/groups/Organisations'
import { fetchUserGroups } from '@/helpers/groups/fetchUserGroups'
import { fetchOrganisations } from '@/helpers/organisations/fetchOrganisations'
import type { Locale } from '@/i18nConfig'
import EmptyState from './EmptyState'

type Props = {
  userId: string
  locale: Locale
}

export default async function GroupsDashboard({ userId, locale }: Props) {
  const { groups, isError: isErrorGroups } = await fetchUserGroups(userId)
  const { organisations, isError: isErrorOrganisations } =
    await fetchOrganisations()

  const isError = isErrorGroups || isErrorOrganisations

  if (isError) return <DefaultErrorAlert />

  if (!((groups?.length ?? 0) > 0) && !((organisations.length ?? 0) > 0)) {
    return <EmptyState locale={locale} />
  }

  return (
    <>
      <Organisations organisations={organisations} locale={locale} />

      <Groups groups={groups} locale={locale} />
    </>
  )
}
