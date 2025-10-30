import Trans from '@/components/translation/trans/TransClient'
import type { Organisation } from '@/types/organisations'
import OrganisationItem from './pollList/OrganisationItem'

type Props = {
  organisations?: Organisation[]
}

export default function PollsList({ organisations }: Props) {
  const [organisation] = organisations || []

  return (
    <div className="mb-8 flex flex-col gap-3" data-testid="poll-list">
      {!!organisation && (
        <>
          <h3 className="mb-0 text-base">
            <Trans>Mon organisation</Trans>
          </h3>
          <OrganisationItem organisation={organisation} />
        </>
      )}
    </div>
  )
}
