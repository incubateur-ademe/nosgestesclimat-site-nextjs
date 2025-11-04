'use client'

import Trans from '@/components/translation/trans/TransClient'
import {
  captureClickHeaderMonEspaceAuthenticated,
  captureClickHeaderMonEspaceUnauthenticated,
  headerClickMonEspaceAuthenticated,
  headerClickMonEspaceUnauthenticated,
} from '@/constants/tracking/user-account'
import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { AuthenticatedUser } from '@/types/authentication'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

const MAX_EMAIL_LENGTH = 20

export default function MySpaceButton({
  authenticatedUser,
}: {
  authenticatedUser?: AuthenticatedUser
}) {
  const { t } = useClientTranslation()

  if (authenticatedUser) {
    return (
      <ButtonLink
        size="sm"
        color="secondary"
        href={MON_ESPACE_PATH}
        className="inline-block"
        onClick={() => {
          trackEvent(headerClickMonEspaceAuthenticated)
          trackPosthogEvent(captureClickHeaderMonEspaceAuthenticated)
        }}
        title={t('header.monEspace.titleEmail', 'Mon Espace ({{email}})', {
          email: authenticatedUser.email,
        })}>
        <Trans i18nKey="header.monEspace.title">Mon Espace</Trans>{' '}
        <span>
          (
          {authenticatedUser.email.length > MAX_EMAIL_LENGTH
            ? `${authenticatedUser.email.substring(0, MAX_EMAIL_LENGTH)}...`
            : authenticatedUser.email}
          )
        </span>
      </ButtonLink>
    )
  }

  return (
    <ButtonLinkServer
      color="secondary"
      href={CONNEXION_PATH}
      onClick={() => {
        trackEvent(headerClickMonEspaceUnauthenticated)
        trackPosthogEvent(captureClickHeaderMonEspaceUnauthenticated)
      }}>
      <Trans i18nKey="header.monEspace.title">Mon Espace</Trans>
    </ButtonLinkServer>
  )
}
