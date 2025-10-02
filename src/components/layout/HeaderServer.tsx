import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'
import LogoLinkServer from '../misc/LogoLinkServer'
import Trans from '../translation/trans/TransServer'
import ProfileIcon from './header/_components/ProfileIcon'
import BottomMenuServer from './header/headerMobile/BottomMenuServer'
import FoldableMenuNoDynamicCTA from './header/headerMobile/FoldableMenuNoDynamicCTA'
import NavLinkServer from './header/NavLinkServer'

type Props = {
  isSticky?: boolean
  locale: Locale
}

export default async function HeaderServer({ isSticky = true, locale }: Props) {
  const { t } = await getServerTranslation({ locale })

  return (
    <header
      className={twMerge(
        'h-20 items-center bg-white shadow-xs',
        isSticky ? 'sticky top-0 z-300' : ''
      )}>
      {/* Header mobile */}
      <div className="relative flex h-full md:hidden">
        <LogoLinkServer />

        <>
          <FoldableMenuNoDynamicCTA />
          <BottomMenuServer locale={locale} />
        </>
      </div>
      {/* Header desktop */}
      <div className="absolute top-0 right-0 bottom-0 left-0 hidden h-20 w-full items-center border-b border-gray-200 bg-white shadow-xs md:flex">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-6">
          <div className="flex origin-left items-center justify-center">
            <LogoLinkServer />
          </div>

          <nav
            className="h-full"
            id="header-navigation"
            aria-label={t('Navigation principale')}
            aria-labelledby="header-navigation-title">
            <p id="header-navigation-title" className="sr-only">
              <Trans locale={locale}>Navigation principale</Trans>
            </p>

            <ul className="flex h-full flex-1 justify-start gap-4">
              <li>
                <NavLinkServer
                  id="nav-first-link"
                  href={SIMULATOR_PATH}
                  activeMatches={['/tutoriel', '/simulateur', '/fin']}
                  icon={BilanIcon}
                  title={t('Mon empreinte')}>
                  <Trans locale={locale}>Mon empreinte</Trans>
                </NavLinkServer>
              </li>

              <li>
                <NavLinkServer
                  href="/actions"
                  icon={ActionsIcon}
                  title={t('Mes gestes')}>
                  <Trans locale={locale}>Mes gestes</Trans>
                </NavLinkServer>
              </li>

              <li>
                <NavLinkServer
                  href={linkToClassement}
                  icon={AmisIcon}
                  activeMatches={['/classement', '/amis']}
                  title={t('Mes classements')}
                  data-cypress-id="amis-link">
                  <Trans locale={locale}>Mes groupes</Trans>
                </NavLinkServer>
              </li>
            </ul>
          </nav>

          <div className="flex h-full items-center gap-3">
            <NavLinkServer
              href="/profil"
              icon={ProfileIcon}
              title={t('Profil')}
              className="px-4 whitespace-nowrap">
              <Trans locale={locale}>Profil</Trans>
            </NavLinkServer>

            <ButtonLink href={SIMULATOR_PATH}>
              <Trans locale={locale}>Accéder au test</Trans>
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
