'use client'

import DefaultErrorMessage from '@/components/error/DefaultErrorMessage'
import MaxWidthContent from '@/components/layout/MaxWidthContent'
import PollLoader from '@/components/organisations/PollLoader'
import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/trans/TransClient'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useFetchPoll } from '@/hooks/organisations/polls/useFetchPoll'
import { useUpdatePoll } from '@/hooks/organisations/polls/useUpdatePoll'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import PollNotFound from '../_components/PollNotFound'
import DeletePollButton from './_components/DeletePollButton'
import NameForm from './_components/NameForm'

export default function ParametresPage() {
  const { data: organisation } = useFetchOrganisation()

  const {
    data: poll,
    isError: isErrorFetchPoll,
    refetch: refetchPoll,
  } = useFetchPoll(organisation)

  const {
    mutate: updatePoll,
    status: updatePollStatus,
    isError: isErrorUpdate,
    isSuccess,
    isPending,
  } = useUpdatePoll()

  if (isErrorFetchPoll) {
    return <PollNotFound />
  }

  if (!organisation || !poll) {
    return <PollLoader />
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

      {isErrorUpdate && <DefaultErrorMessage />}

      {isSuccess && !isPending && (
        <p className="text-green-800">
          <Trans>Votre campagne a été mise à jour.</Trans>
        </p>
      )}

      <NameForm
        nameValue={poll?.name ?? ''}
        expectedNumberOfParticipants={
          poll?.expectedNumberOfParticipants ?? undefined
        }
        updatePoll={updatePoll}
        updatePollStatus={updatePollStatus}
        refetchPoll={refetchPoll}
      />

      <Separator />

      <QuestionsComplementaires
        onChangeCustomQuestions={updatePoll}
        organisation={organisation}
        onChange={updatePoll}
        description={' '}
        poll={poll}
      />

      <Separator className="my-4" />

      <DeletePollButton />
    </MaxWidthContent>
  )
}
