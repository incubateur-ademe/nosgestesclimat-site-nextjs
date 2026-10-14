import logger from '@/logger/logger.browser'
import { createPoll } from '@/services/organisations/create-poll'
import type { Poll } from '@nosgestesclimat/core/features/polls/types/poll'
import { toError } from '@nosgestesclimat/core/lib/to-error'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

interface UseCreatePollProps {
  organisationSlug: string
}

interface FormValues {
  name: string
  expectedNumberOfParticipants?: number | null
}

export function useCreatePoll({ organisationSlug }: UseCreatePollProps) {
  const form = useForm<Pick<Poll, 'name' | 'expectedNumberOfParticipants'>>()

  const [isPending, startTransition] = useTransition()
  const [unknownError, setUnknownError] = useState<unknown>(undefined)
  function onSubmit({ name, expectedNumberOfParticipants }: FormValues) {
    setUnknownError(undefined)

    startTransition(async () => {
      try {
        await createPoll({
          organisationIdOrSlug: organisationSlug,
          poll: {
            name,
            expectedNumberOfParticipants:
              expectedNumberOfParticipants ?? undefined,
          },
        })
      } catch (error) {
        // Throw in case of redirect to complete redirection
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
          throw error
        }
        setUnknownError(error)
        logger.error(toError(error), {
          scope: 'site.interaction.createOrganisation',
        })
      }
    })
  }

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isPending,
    unknownError,
  }
}
