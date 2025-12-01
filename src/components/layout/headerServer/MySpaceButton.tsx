import Trans from '@/components/translation/trans/TransServer'
import {
  captureClickHeaderMonEspaceUnauthenticatedServer,
  headerClickMonEspaceUnauthenticatedServer,
} from '@/constants/tracking/user-account'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { getAuthentifiedUser } from '@/helpers/authentication/getAuthentifiedUser'
import { getLocale } from '@/helpers/language/getLocale'
import MySpaceDropdown from './MySpaceDropdown'

export default async function MySpaceButton() {
  const locale = await getLocale()

  const authenticatedUser = await getAuthentifiedUser()

  if (authenticatedUser) {
    return <MySpaceDropdown email={authenticatedUser.email} locale={locale} />
  }

  return (
    <ButtonLinkServer
      color="secondary"
      href={CONNEXION_PATH}
      data-track-event={headerClickMonEspaceUnauthenticatedServer}
      data-track-posthog={captureClickHeaderMonEspaceUnauthenticatedServer}>
      <Trans locale={locale} i18nKey="header.monEspace.title">
        Mon Espace
      </Trans>
    </ButtonLinkServer>
  )
}
