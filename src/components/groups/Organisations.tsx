import Trans from '@/components/translation/trans/TransServer'
import Title from '@/design-system/layout/Title'
import { getLocale } from '@/helpers/language/getLocale'
import type { Organisation } from '@/types/organisations'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default async function Organisations({
  organisations,
}: {
  organisations: Organisation[]
}) {
  const locale = await getLocale()

  return (
    <div className="mb-10">
      <Title
        tag="h2"
        title={
          <Trans locale={locale} i18nKey="mon-espace.organisations.title">
            Mes organisations
          </Trans>
        }
      />

      {!((organisations.length ?? 0) > 0) ? (
        <CreateOrganisation />
      ) : (
        <PollsList organisations={organisations} />
      )}
    </div>
  )
}
