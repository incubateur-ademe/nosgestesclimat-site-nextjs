import LogOutIcon from '@/components/icons/LogOutIcon'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import { logout } from '@/helpers/server/model/user'
import { resetLocalStorage } from '@/helpers/user/resetLocalStorage'
import { redirect } from 'next/navigation'

async function handleLogout() {
  'use server'
  await logout()
  redirect('/organisations')
}

export default function DeconnexionButton() {
  const handleDisconnect = async () => {
    await resetLocalStorage()
    await handleLogout()
  }

  return (
    <Button
      color="text"
      className="text-primary-700 flex max-w-full items-center gap-2 underline"
      onClick={handleDisconnect}>
      <LogOutIcon className="fill-primary-700 mr-2" />
      <span className="text-left whitespace-normal">
        <Trans>Se déconnecter de votre espace organisation</Trans>
      </span>
    </Button>
  )
}
