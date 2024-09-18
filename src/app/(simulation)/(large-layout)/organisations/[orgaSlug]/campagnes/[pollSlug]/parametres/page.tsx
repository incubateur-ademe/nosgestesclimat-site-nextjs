'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import ToastDisplay from '@/components/messages/ToastDisplay'
import PollLoader from '@/components/organisations/PollLoader'
import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import { useIsOrganisationAdmin } from '@/hooks/organisations/useIsOrganisationAdmin'
import { usePoll } from '@/hooks/organisations/usePoll'
import { useUpdateCustomQuestions } from '@/hooks/organisations/useUpdateCustomQuestions'
import { useUpdatePoll } from '@/hooks/organisations/useUpdatePoll'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import PollNotFound from '../_components/PollNotFound'
import DeletePollButton from './_components/DeletePollButton'
import NameForm from './_components/NameForm'

export default function ParametresPage() {
  const { pollSlug, orgaSlug } = useParams()

  const { user } = useUser()

  const { t } = useClientTranslation()

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

  const { mutate: updatePoll, status: updatePollStatus } = useUpdatePoll()

  const {
    mutate: updatePollCustomQuestions,
    status: updatePollCustomQuestionsStatus,
  } = useUpdateCustomQuestions({
    pollSlug: pollSlug as string,
    orgaSlug: orgaSlug as string,
  })

  // If the mutation status (of updatePoll or updatePollCustomQuestions) change to success,
  // we refetch the poll and display a confirmation message
  useEffect(() => {
    if (updatePollStatus === 'success') {
      displaySuccessToast(t('Vos informations ont bien été mises à jour.'))

      refetchPoll()
    }
  }, [updatePollStatus, refetchPoll, t])
  useEffect(() => {
    if (updatePollCustomQuestionsStatus === 'success') {
      displaySuccessToast(t('Vos informations ont bien été mises à jour.'))

      refetchPoll()
    }
  }, [updatePollCustomQuestionsStatus, refetchPoll, t])

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
        updatePoll={updatePoll}
        updatePollStatus={updatePollStatus}
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
        onChange={updatePoll}
        onChangeCustomQuestions={updatePollCustomQuestions}
      />

      <Separator className="my-4" />

      <DeletePollButton />

      <ToastDisplay />
    </MaxWidthContent>
  )
}
