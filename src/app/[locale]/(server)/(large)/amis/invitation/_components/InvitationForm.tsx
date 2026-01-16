'use client'

import Button from '@/design-system/buttons/Button'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { fetchUser } from '@/helpers/user/fetchUser'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm as useReactHookForm } from 'react-hook-form'
import { useSaveParticipation } from '../_hooks/useSaveParticipation'
import SubmitSection from './SubmitSection'

interface Inputs {
  guestName: string
  guestEmail: string
}

export default function InvitationForm({ group }: { group: Group }) {
  const { t } = useClientTranslation()

  const router = useRouter()

  const { data: authenticatedUser } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => fetchUser(),
  })

  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const { handleSaveParticipation } = useSaveParticipation({
    groupId: group.id,
  })

  function onSubmit({ guestName }: Inputs) {
    if (authenticatedUser) {
      handleSaveParticipation({
        guestName: guestName ?? '',
        guestEmail: authenticatedUser.email,
      })
    } else {
      // Preserve searchParams when redirecting
      const search = window.location.search

      const searchParams = new URLSearchParams(search)
      searchParams.set('guestName', encodeURIComponent(guestName))

      router.push(`/amis/invitation/votre-email?${searchParams.toString()}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex flex-col items-start gap-4">
      <PrenomInput
        data-cypress-id="member-name"
        value={user.name ?? ''}
        error={errors.guestName?.message}
        {...register('guestName', {
          required: t('Veuillez renseigner votre prénom.'),
        })}
      />

      {authenticatedUser ? (
        <SubmitSection />
      ) : (
        <Button type="submit" data-cypress-id="button-join-group-next">
          Suivant
        </Button>
      )}
    </form>
  )
}
