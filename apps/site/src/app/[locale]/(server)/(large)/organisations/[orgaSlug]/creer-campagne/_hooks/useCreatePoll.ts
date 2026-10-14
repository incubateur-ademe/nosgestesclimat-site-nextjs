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
  const [isPending, startTransition] = useTransition()
  const [unknownError, setUnknownError] = useState<unknown>(undefined)

  const form = useForm<Pick<Poll, 'name' | 'expectedNumberOfParticipants'>>()

  const { handleSubmit, register, formState } = form

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
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors: formState.errors,
    isPending,
    unknownError,
  }
}
