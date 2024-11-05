'use client'

import type { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import { ORGANISATION_URL } from '@/constants/urls'
import type { OrganisationPoll } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export type PollUpdateDto = {
  name?: string
  expectedNumberOfParticipants?: number
  defaultAdditionalQuestions?: PollDefaultAdditionalQuestion[]
  customAdditionalQuestions?: { question: string; isEnabled: boolean }[]
}

export function useUpdatePoll() {
  const { orgaSlug, pollSlug } = useParams()

  return useMutation({
    mutationKey: ['organisations', orgaSlug, 'polls', pollSlug],
    mutationFn: (dto: PollUpdateDto) =>
      axios
        .put<OrganisationPoll>(
          `${ORGANISATION_URL}/${orgaSlug}/polls/${pollSlug}`,
          dto,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
