'use client'

import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { UpdatePollProps } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export function useUpdatePoll() {
  const { user } = useUser()

  const { orgaSlug, pollSlug } = useParams() as {
    orgaSlug: string
    pollSlug: string
  }

  return useMutation({
    mutationKey: ['updatePoll', pollSlug],
    mutationFn: ({ name, defaultAdditionalQuestions }: UpdatePollProps) =>
      axios
        .post(
          `${SERVER_URL}/polls/update`,
          {
            email: user?.organisation?.administratorEmail,
            orgaSlug,
            pollSlug,
            name,
            defaultAdditionalQuestions,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
