'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import ModificationSaved from '@/components/messages/ModificationSaved'
import PollLoader from '@/components/organisations/PollLoader'
import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useIsOrganisationAdmin } from '@/hooks/organisations/useIsOrganisationAdmin'
import { usePoll } from '@/hooks/organisations/usePoll'
import { useUpdateCustomQuestions } from '@/hooks/organisations/useUpdateCustomQuestions'
import { useUpdatePoll } from '@/hooks/organisations/useUpdatePoll'
import { useAutoFlick } from '@/hooks/utils/useAutoFlick'
import { useUser } from '@/publicodes-state'
import { CustomAdditionalQuestions } from '@/types/organisations'
import { useParams } from 'next/navigation'
import PollNotFound from '../_components/PollNotFound'
import DeletePollButton from './_components/DeletePollButton'
import NameForm from './_components/NameForm'

export default function ParametresPage() {
  const { pollSlug, orgaSlug } = useParams()

  const { user } = useUser()

  const { isAdmin, isLoading: isLoadingOrgaAdmin } = useIsOrganisationAdmin()

  const {
    data: poll,
    isError,
    isLoading,
    refetch: refetchPoll,
  } = usePoll({
    pollSlug: pollSlug as string,
    isEnabled: isAdmin,
    orgaSlug: orgaSlug as string,
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutateAsync: updatePoll } = useUpdatePoll()

  const { mutateAsync: updatePollCustomQuestions } = useUpdateCustomQuestions({
    pollSlug: pollSlug as string,
    orgaSlug: orgaSlug as string,
  })

  const { value, flick } = useAutoFlick()

  async function handleUpdatePollCustomQuestions(changes: {
    customAdditionalQuestions: CustomAdditionalQuestions[]
  }) {
    try {
      await updatePollCustomQuestions(changes)
      flick()
      refetchPoll()
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading || isLoadingOrgaAdmin) {
    return <PollLoader />
  }

  if (isError && !isLoading && !poll) {
    return <PollNotFound />
  }

  return (
    <MaxWidthContent className="pb-8">
      <Title
        title={
          <span>
            <Trans>Paramètres de</Trans>{' '}
            <span className="text-secondary-700">{poll?.name}</span>
          </span>
        }
      />

      <NameForm
        nameValue={poll?.name ?? ''}
        refetchPoll={refetchPoll}
        updatePoll={updatePoll as any}
      />

      <Separator />

      <QuestionsComplementaires
        description={' '}
        poll={{
          defaultAdditionalQuestions: poll?.defaultAdditionalQuestions as [
            string,
          ],
          customAdditionalQuestions: poll?.customAdditionalQuestions,
        }}
        onChange={updatePoll as any}
        onChangeCustomQuestions={handleUpdatePollCustomQuestions as any}
      />

      <ModificationSaved shouldShowMessage={value} />

      <Separator className="my-4" />

      <DeletePollButton />
    </MaxWidthContent>
  )
}
