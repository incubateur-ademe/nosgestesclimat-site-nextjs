import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'
import LogoLinkServer from '../misc/LogoLinkServer'
import Trans from '../translation/trans/TransServer'

type Props = {
  isSticky?: boolean
  locale: Locale
}

const MAX_EMAIL_LENGTH = 20

export default async function HeaderServer({ isSticky = true, locale }: Props) {
  const authenticatedUser = await getIsUserAuthenticated()

  return (
    <header
      className={twMerge(
        'h-20 items-center bg-white shadow-xs',
        isSticky ? 'sticky top-0 z-300' : ''
      )}>
      <div className="absolute top-0 right-0 bottom-0 left-0 h-20 w-full items-center border-b border-gray-200 bg-white shadow-xs md:flex">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-6 px-4 md:px-0">
          <div className="flex origin-left items-center justify-center">
            <LogoLinkServer />
          </div>

          <div className="flex h-full items-center">
            {authenticatedUser ? (
              <ButtonLinkServer
                size="sm"
                color="secondary"
                href={MON_ESPACE_PATH}
                className="inline-block">
                <Trans i18nKey="header.monEspace" locale={locale}>
                  Mon Espace
                </Trans>{' '}
                <span>
                  (
                  {authenticatedUser.email.length > MAX_EMAIL_LENGTH
                    ? `${authenticatedUser.email.substring(0, MAX_EMAIL_LENGTH)}...`
                    : authenticatedUser.email}
                  )
                </span>
              </ButtonLinkServer>
            ) : (
              <ButtonLinkServer color="secondary" href={CONNEXION_PATH}>
                <Trans i18nKey="header.monEspace" locale={locale}>
                  Mon Espace
                </Trans>
              </ButtonLinkServer>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
