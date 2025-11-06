import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import type { Organisation } from '@/types/organisations'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default function Organisations({
  organisations,
}: {
  organisations: Organisation[]
}) {
  return (
    <div className="mb-10 max-w-[683px]">
      <Title
        tag="h2"
        title={
          <Trans i18nKey="mon-espace.organisations.title">
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
