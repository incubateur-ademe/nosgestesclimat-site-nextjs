'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/Trans'
import Loader from '@/design-system/layout/Loader'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useIsOrganisationAdmin } from '@/hooks/organisations/useIsOrganisationAdmin'
import { usePoll } from '@/hooks/organisations/usePoll'
import { useUpdatePoll } from '@/hooks/organisations/useUpdatePoll'
import { useParams } from 'next/navigation'
import PollNotFound from '../_components/PollNotFound'
import DeletePollButton from './_components/DeletePollButton'
import NameForm from './_components/NameForm'

export default function ParametresPage() {
  const { pollSlug } = useParams()

  const isAdmin = useIsOrganisationAdmin()

  const {
    data: poll,
    isError,
    isLoading,
  } = usePoll({
    pollSlug: pollSlug as string,
    isEnabled: isAdmin,
  })

  const { mutateAsync: updatePoll } = useUpdatePoll()

  if (isLoading) {
    return <Loader />
  }

  if (isError && !isLoading && !poll) {
    return <PollNotFound />
  }

  return (
    <MaxWidthContent className="pb-8">
      <Title
        title={
          <span>
            <Trans>Paramètres de</Trans> {poll?.name}
          </span>
        }
      />

      <NameForm nameValue={poll?.name ?? ''} updatePoll={updatePoll as any} />

      <Separator />

      <QuestionsComplementaires
        description={' '}
        poll={poll}
        onChange={updatePoll as any}
      />

      <Separator />

      <DeletePollButton />
    </MaxWidthContent>
  )
}
