'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import ToastDisplay from '@/components/messages/ToastDisplay'
import PollLoader from '@/components/organisations/PollLoader'
import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import { useFetchPoll } from '@/hooks/organisations/polls/useFetchPoll'
import { useUpdatePoll } from '@/hooks/organisations/polls/useUpdatePoll'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEffect } from 'react'
import PollNotFound from '../_components/PollNotFound'
import DeletePollButton from './_components/DeletePollButton'
import NameForm from './_components/NameForm'

export default function ParametresPage() {
  const { t } = useClientTranslation()

  const { data: organisation } = useFetchOrganisation()

  const {
    data: poll,
    isError,
    refetch: refetchPoll,
  } = useFetchPoll(organisation)

  const { mutate: updatePoll, status: updatePollStatus } = useUpdatePoll()

  // If the mutation status (of updatePoll or updatePollCustomQuestions) change to success,
  // we refetch the poll and display a confirmation message
  useEffect(() => {
    if (updatePollStatus === 'success') {
      displaySuccessToast(t('Vos informations ont bien été mises à jour.'))

      refetchPoll()
    }
  }, [updatePollStatus, refetchPoll, t])

  if (isError) {
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
            <Trans locale={locale}>Paramètres de</Trans>{' '}
            <span className="text-secondary-700">{poll?.name}</span>
          </span>
        }
      />

      <NameForm
        nameValue={poll?.name ?? ''}
        expectedNumberOfParticipants={
          poll?.expectedNumberOfParticipants ?? undefined
        }
        updatePoll={updatePoll}
        updatePollStatus={updatePollStatus}
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

      <ToastDisplay />
    </MaxWidthContent>
  )
}
