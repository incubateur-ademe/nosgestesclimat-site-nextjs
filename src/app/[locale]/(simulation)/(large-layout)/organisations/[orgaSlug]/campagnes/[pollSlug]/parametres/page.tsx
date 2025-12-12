'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import MaxWidthContent from '@/components/layout/MaxWidthContent'
import PollLoader from '@/components/organisations/PollLoader'
import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/trans/TransClient'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useFetchPoll } from '@/hooks/organisations/polls/useFetchPoll'
import {
  type PollToUpdate,
  useUpdatePoll,
} from '@/hooks/organisations/polls/useUpdatePoll'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PollNotFound from '../_components/PollNotFound'
import DeletePollButton from './_components/DeletePollButton'
import NameForm from './_components/NameForm'

export default function ParametresPage() {
  const { data: organisation } = useFetchOrganisation()

  const queryClient = useQueryClient()

  const { pollSlug: pollIdOrSlug } = useParams()

  const {
    data: poll,
    isError: isErrorFetchPoll,
    refetch: refetchPoll,
  } = useFetchPoll(organisation)

  const {
    mutate: updatePoll,
    status: updatePollStatus,
    isError: isErrorUpdate,
  } = useUpdatePoll({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['organisations', organisation?.slug, 'polls', pollIdOrSlug],
      })
    },
  })

  const updateAndRefetchPoll = (data: PollToUpdate) => {
    updatePoll(data)
  }

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

      {isErrorUpdate && <DefaultSubmitErrorMessage />}

      <NameForm
        nameValue={poll?.name ?? ''}
        expectedNumberOfParticipants={
          poll?.expectedNumberOfParticipants ?? undefined
        }
        updatePoll={updateAndRefetchPoll}
        updatePollStatus={updatePollStatus}
        refetchPoll={refetchPoll}
      />

      <Separator />

      <QuestionsComplementaires
        onChange={updateAndRefetchPoll}
        organisation={organisation}
        description={' '}
        poll={poll}
      />

      <Separator className="my-4" />

      <DeletePollButton />
    </MaxWidthContent>
  )
}
