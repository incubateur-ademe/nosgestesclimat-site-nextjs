'use client'

import LogOutIcon from '@/components/icons/LogOutIcon'
import Trans from '@/components/translation/trans/TransClient'
import { organisationsParametersLogout } from '@/constants/tracking/pages/organisationsParameters'
import Button from '@/design-system/inputs/Button'
import { useLogout } from '@/hooks/authentication/useLogout'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function DeconnexionButton() {
  const { mutateAsync: logout } = useLogout()

  const router = useRouter()
  const queryClient = useQueryClient()

  async function handleDisconnect() {
    trackEvent(organisationsParametersLogout)
    await logout()

    queryClient.clear()

    router.push('/organisations')
  }

  return (
    <Button
      color="text"
      className="text-primary-700 flex items-center gap-2 underline"
      onClick={handleDisconnect}>
      <LogOutIcon className="fill-primary-700 mr-2" />
      <Trans>Se déconnecter de votre espace organisation</Trans>
    </Button>
  )
}
