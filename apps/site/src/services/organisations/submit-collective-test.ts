'use server'

import { ADMINISTRATOR_SEPARATOR } from '@/constants/organisations/administrator'
import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import { ORGANISATION_URL } from '@/constants/urls/main'
import { fetchServer } from '@/helpers/server/fetchServer'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { failure, success, type Result } from '@nosgestesclimat/core/lib/result'
import { revalidatePath } from 'next/cache'
import { SubmissionError } from './submission-errors'

export interface SubmitCollectiveTestInput {
  pollDraft: {
    name: string
    mode: 'standard' | 'scolaire'
    expectedNumberOfParticipants?: number
  }
  orgaDraft: {
    name?: string
    organisationType?: OrganisationTypeEnum
    administratorFirstName?: string
    administratorLastName?: string
    administratorPosition?: string
  } | null
}

export type SubmitCollectiveTestResult = Result<
  { pollId: string; pollSlug: string; orgSlug: string },
  SubmissionError
>

export const submitCollectiveTest = async ({
  pollDraft,
  orgaDraft,
  locale,
}: SubmitCollectiveTestInput & {
  locale?: string
}): Promise<SubmitCollectiveTestResult> => {
  const params = locale ? `?locale=${locale}` : ''

  const hasCompleteOrgaDraft =
    !!orgaDraft?.name &&
    !!orgaDraft.organisationType &&
    !!orgaDraft.administratorFirstName &&
    !!orgaDraft.administratorLastName

  try {
    const { organisation, poll } = await fetchServer<{
      organisation: Organisation
      poll: OrganisationPoll
    }>(`${ORGANISATION_URL}/collective-tests${params}`, {
      method: 'POST',
      body: {
        ...(hasCompleteOrgaDraft
          ? {
              organisation: {
                name: orgaDraft.name!,
                type: orgaDraft.organisationType,
                administrators: [
                  {
                    name: `${orgaDraft.administratorFirstName}${ADMINISTRATOR_SEPARATOR}${orgaDraft.administratorLastName}`,
                    position: orgaDraft.administratorPosition ?? '',
                    optedInForCommunications: false,
                  },
                ],
              },
            }
          : {}),
        poll: {
          name: pollDraft.name,
          mode: pollDraft.mode,
          expectedNumberOfParticipants:
            pollDraft.expectedNumberOfParticipants ?? undefined,
        },
      },
    })

    revalidatePath(`/organisations/${organisation.slug}`)
    revalidatePath('/organisations')

    return success({
      pollId: poll.id,
      pollSlug: poll.slug,
      orgSlug: organisation.slug,
    })
  } catch {
    return failure(new SubmissionError())
  }
}
