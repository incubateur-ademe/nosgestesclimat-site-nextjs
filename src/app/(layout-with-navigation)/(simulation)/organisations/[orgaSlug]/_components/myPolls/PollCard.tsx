import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { OrganisationPoll } from '@/types/organisations'
import { useParams } from 'next/navigation'

type Props = {
  poll: OrganisationPoll
  index: number
}

export default function PollCard({ poll, index }: Props) {
  const { orgaSlug } = useParams()

  const { t } = useClientTranslation()

  if (!poll) return null

  console.log(poll)

  return (
    <div className="rounded-xl bg-primary-100 p-6">
      <h3 className="mb-10">
        {poll.name ?? t('Ma campagne n°{{number}}', { number: index + 1 })}
      </h3>

      <div className="mb-12">
        <p className="mb-0 text-xl font-bold text-primary-700">
          {poll.simulations?.length}{' '}
        </p>
        <p className="text-base font-light text-default">
          {poll.simulations?.length > 1 ? (
            <Trans>Simulations terminées</Trans>
          ) : (
            <Trans>Simulation terminée</Trans>
          )}
        </p>
      </div>

      <ButtonLink
        className="w-full"
        href={`/organisations/${orgaSlug}/${poll?.slug}`}>
        <Trans>Voir le détail</Trans>
      </ButtonLink>
    </div>
  )
}
