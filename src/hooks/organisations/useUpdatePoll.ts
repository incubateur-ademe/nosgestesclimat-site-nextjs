'use client'

import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { CustomAdditionalQuestions } from './../../types/organisations'

type MutationProps = {
  name: string
  defaultAdditionalQuestions: string[]
  customAdditionalQuestions: CustomAdditionalQuestions
}

export function useUpdatePoll() {
  const { user } = useUser()

  const { orgaSlug, pollSlug } = useParams()

  return useMutation({
    mutationKey: ['updatePoll', pollSlug],
    mutationFn: ({
      name,
      defaultAdditionalQuestions,
      customAdditionalQuestions,
    }: MutationProps) =>
      axios
        .post(
          `${SERVER_URL}/polls/update`,
          {
            email: user?.organisation?.administratorEmail,
            orgaSlug,
            pollSlug,
            name,
            defaultAdditionalQuestions,
            customAdditionalQuestions,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
  })
}
