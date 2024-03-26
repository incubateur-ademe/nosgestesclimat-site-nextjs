'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useLogoutOrganisation } from '@/hooks/organisations/useLogout'
import { Organisation } from '@/types/organisations'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function DeconnexionButton({
  organisation,
}: {
  organisation: Organisation | undefined
}) {
  const { mutateAsync: logoutOrganisation } = useLogoutOrganisation({
    orgaSlug: organisation?.slug,
  })

  const router = useRouter()
  const queryClient = useQueryClient()

  async function handleDisconnect() {
    await logoutOrganisation()

    queryClient.clear()

    router.push('/organisations')
  }

  return (
    <Button
      color="text"
      className="flex items-center gap-2 text-primary-500 underline"
      onClick={handleDisconnect}>
      <Emoji>⬅️</Emoji>{' '}
      <Trans>Se déconnecter de votre espace organisation</Trans>
    </Button>
  )
}
