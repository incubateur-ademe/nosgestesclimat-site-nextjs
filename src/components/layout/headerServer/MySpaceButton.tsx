import Trans from '@/components/translation/trans/TransServer'
import {
  captureClickHeaderMonEspaceUnauthenticatedServer,
  headerClickMonEspaceUnauthenticatedServer,
} from '@/constants/tracking/user-account'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { getUser, logout } from '@/helpers/server/model/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import MySpaceDropdown from './MySpaceDropdown'

async function logoutAndRedirect() {
  'use server'
  await logout()
  revalidatePath('/')
  redirect('/')
}

export default async function MySpaceButton({ locale }: { locale: string }) {
  try {
    const user = await getUser()
    return <MySpaceDropdown email={user.email} onLogout={logoutAndRedirect} />
  } catch {
    return (
      <ButtonLinkServer
        color="secondary"
        href={CONNEXION_PATH}
        data-track-event={headerClickMonEspaceUnauthenticatedServer}
        data-track-posthog={captureClickHeaderMonEspaceUnauthenticatedServer}>
        <Trans locale={locale} i18nKey="header.monEspace.title">
          Mon espace
        </Trans>
      </ButtonLinkServer>
    )
  }
}
