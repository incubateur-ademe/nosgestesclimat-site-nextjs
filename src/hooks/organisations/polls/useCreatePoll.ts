import type { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import { ORGANISATION_URL } from '@/constants/urls'
import type { OrganisationPoll } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type PollCreateDto = {
  name: string
  expectedNumberOfParticipants?: number
  defaultAdditionalQuestions?: PollDefaultAdditionalQuestion[]
  customAdditionalQuestions?: { question: string; isEnabled: boolean }[]
}

export function useCreatePoll(organisationIdOrSlug: string) {
  return useMutation({
    mutationKey: ['organisations', organisationIdOrSlug, 'polls'],
    mutationFn: (dto: PollCreateDto) =>
      axios
        .post<OrganisationPoll>(
          `${ORGANISATION_URL}/${organisationIdOrSlug}/polls`,
          dto,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
