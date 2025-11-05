import Trans from '@/components/translation/trans/TransServer'
import {
  captureClickHeaderMonEspaceAuthenticatedServer,
  captureClickHeaderMonEspaceUnauthenticatedServer,
  headerClickMonEspaceAuthenticatedServer,
  headerClickMonEspaceUnauthenticatedServer,
} from '@/constants/tracking/user-account'
import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getLocale } from '@/helpers/language/getLocale'
import type { AuthenticatedUser } from '@/types/authentication'

const MAX_EMAIL_LENGTH = 20

export default async function MySpaceButton({
  authenticatedUser,
}: {
  authenticatedUser?: AuthenticatedUser
}) {
  const locale = await getLocale()

  const { t } = await getServerTranslation({ locale })

  if (authenticatedUser) {
    return (
      <ButtonLinkServer
        size="sm"
        color="secondary"
        href={MON_ESPACE_PATH}
        className="inline-block"
        data-track-event={headerClickMonEspaceAuthenticatedServer}
        data-track-posthog={captureClickHeaderMonEspaceAuthenticatedServer}
        title={t('header.monEspace.titleEmail', 'Mon Espace ({{email}})', {
          email: authenticatedUser.email,
        })}>
        <Trans locale={locale} i18nKey="header.monEspace.title">
          Mon Espace
        </Trans>{' '}
        <span>
          (
          {authenticatedUser.email.length > MAX_EMAIL_LENGTH
            ? `${authenticatedUser.email.substring(0, MAX_EMAIL_LENGTH)}…`
            : authenticatedUser.email}
          )
        </span>
      </ButtonLinkServer>
    )
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
