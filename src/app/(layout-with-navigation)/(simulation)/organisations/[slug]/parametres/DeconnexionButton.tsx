'use client'

import LogOutIcon from '@/components/icons/LogOutIcon'
import Trans from '@/components/translation/Trans'
import { organisationsParametersLogout } from '@/constants/tracking/pages/organisationsParameters'
import Button from '@/design-system/inputs/Button'
import { useLogoutOrganisation } from '@/hooks/organisations/useLogout'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'
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
    trackEvent(organisationsParametersLogout)
    await logoutOrganisation()

    queryClient.clear()

    router.push('/organisations')
  }

  return (
    <Button
      color="text"
      className="flex items-center gap-2 text-primary-700 underline"
      onClick={handleDisconnect}>
      <LogOutIcon className="mr-2 fill-primary-700" />
      <Trans>Se déconnecter de votre espace organisation</Trans>
    </Button>
  )
}
