'use client'

import type { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import { ORGANISATION_URL } from '@/constants/urls'
import type { OrganisationPoll } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export type PollToUpdate = {
  name?: string
  expectedNumberOfParticipants?: number
  defaultAdditionalQuestions?: PollDefaultAdditionalQuestion[]
  customAdditionalQuestions?: { question: string; isEnabled: boolean }[]
}

export function useUpdatePoll() {
  const param = useParams<{ orgaSlug: string; pollSlug: string }>() 
  const orgaSlug = param?.orgaSlug
  const pollSlug = param?.pollSlug

  return useMutation({
    mutationKey: ['organisations', orgaSlug, 'polls', pollSlug],
    mutationFn: (pollToUpdate: PollToUpdate) =>
      axios
        .put<OrganisationPoll>(
          `${ORGANISATION_URL}/${orgaSlug}/polls/${pollSlug}`,
          pollToUpdate,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
