import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { fetchGroup } from '@/hooks/groups/useFetchGroup'
import { fetchPoll } from '@/hooks/organisations/polls/useFetchPoll'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
  userId: string
  groupId?: string
  pollId?: string
  organisationId?: string
  name?: string
}

const fetchGroupName = async ({
  userId,
  groupId,
  pollId,
  organisationId,
}: {
  userId: string
  groupId?: string
  pollId?: string
  organisationId?: string
}) => {
  if (groupId) {
    const group = await fetchGroup({ userId, groupId })
    return group.name
  }
  if (pollId && organisationId) {
    const poll = await fetchPoll({ organisationId, pollId })
    return poll.name
  }
}

export default async function SeeGroupResultsBanner({
  locale,
  userId,
  groupId,
  pollId,
  organisationId,
  // @TODO : prop only for Storybook usage, remove this when the component is implemented
  name: nameFromProps,
}: Props) {
  if (!groupId && !pollId && !organisationId && !nameFromProps) return null

  const name =
    nameFromProps ??
    (await fetchGroupName({
      userId,
      groupId,
      pollId,
      organisationId,
    }))

  return (
    <div className="bg-secondary-50 flex w-full flex-col items-center gap-4 rounded-lg px-4 py-6">
      <div className="text-center">
        <h2 className="mb-1 text-lg font-bold">
          <Trans i18nKey="fin.seeGroupResultsBanner.title" locale={locale}>
            Merci d'avoir complété le test !
          </Trans>
        </h2>

        <p className="mb-0 text-center text-lg">
          <Trans i18nKey="fin.seeGroupResultsBanner.text" locale={locale}>
            Découvrez les résultats du test collectif
          </Trans>{' '}
          "{name}"
        </p>
      </div>

      <ButtonLink
        href={
          groupId
            ? `/amis/resultats?groupId=${groupId}`
            : `/organisations/${organisationId}/campagnes/${pollId}`
        }>
        <Trans i18nKey="fin.seeGroupResultsBanner.button" locale={locale}>
          Voir les résultats
        </Trans>
      </ButtonLink>
    </div>
  )
}
