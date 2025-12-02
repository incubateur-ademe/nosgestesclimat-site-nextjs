import Trans from '@/components/translation/trans/TransServer'
import {
  captureClickHeaderMonEspaceUnauthenticatedServer,
  headerClickMonEspaceUnauthenticatedServer,
} from '@/constants/tracking/user-account'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { getLocale } from '@/helpers/language/getLocale'
import { getUser } from '@/helpers/server/model/user'
import MySpaceDropdown from './MySpaceDropdown'

export default async function MySpaceButton() {
  const locale = await getLocale()

  try {
    const user = await getUser()
    return <MySpaceDropdown email={user.email} locale={locale} />
  } catch (error) {
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
}
