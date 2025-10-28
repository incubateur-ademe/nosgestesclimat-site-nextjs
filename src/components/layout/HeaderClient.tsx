'use client'

import {
  headerClickActions,
  headerClickClassements,
  headerClickLogo,
  headerClickProfil,
  headerClickTest,
} from '@/constants/tracking/layout'
import { HIDE_CTA_PATHS } from '@/constants/urls/main'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import CTAButtonsPlaceholder from '../cta/CTAButtonsPlaceholder'
import ActionsIcon from '../icons/ActionsIcon'
import AmisIcon from '../icons/AmisIcon'
import BilanIcon from '../icons/BilanIcon'
import Logo from '../misc/Logo'
import LogoLink from '../misc/LogoLink'
import Trans from '../translation/trans/TransClient'
import OrganisationLink from './header/_components/OrganisationLink'
import ProfileIcon from './header/_components/ProfileIcon'
import DebugIndicator from './header/headerDesktop/DebugIndicator'
import PRIndicator from './header/headerDesktop/PRIndicator'
import BottomMenu from './header/headerMobile/BottomMenu'
import FoldableMenu from './header/headerMobile/FoldableMenu'
import NavLink from './header/NavLink'

const DynamicCTAButton = dynamic(
  () => import('./header/headerDesktop/MenuCTAButton'),
  {
    ssr: false,
    loading: () => <CTAButtonsPlaceholder className="w-36" />,
  }
)

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  const { isIframeOnlySimulation } = useIframe()

  const { t } = useClientTranslation()

  const { getLinkToSimulateurPage } = useSimulateurPage()

  const { user } = useUser()

  const pathname = usePathname()

  return (
    <header
      role="banner"
      className={twMerge(
        'h-20 w-full items-center bg-white shadow-sm',
        isSticky ? 'sticky top-0 z-300' : ''
      )}>
      {/* Header mobile */}
      <div className="relative flex h-full md:hidden">
        {isIframeOnlySimulation ? (
          <Logo />
        ) : (
          <LogoLink onClick={() => trackEvent(headerClickLogo)} />
        )}

        {!isIframeOnlySimulation && (
          <>
            <FoldableMenu />
            <BottomMenu />
          </>
        )}
      </div>
      {/* Header desktop */}
      <div className="hidden h-20 w-full items-center md:flex">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-6">
          <div className="flex origin-left items-center justify-center">
            {isIframeOnlySimulation ? (
              <Logo />
            ) : (
              <LogoLink onClick={() => trackEvent(headerClickLogo)} />
            )}
          </div>

          {!isIframeOnlySimulation && (
            <>
              <nav
                role="navigation"
                className="h-full"
                tabIndex={-1}
                id="header-navigation-desktop"
                aria-label={t('Navigation principale')}
                aria-labelledby="header-navigation-title">
                <p id="header-navigation-title" className="sr-only">
                  <Trans>Navigation principale</Trans>
                </p>

                <ul className="flex h-full flex-1 justify-start gap-4">
                  <li>
                    <NavLink
                      id="nav-first-link"
                      href={getLinkToSimulateurPage()}
                      onClick={() => trackEvent(headerClickTest)}
                      activeMatches={['/tutoriel', '/simulateur', '/fin']}
                      icon={BilanIcon}
                      title={t('Mon empreinte')}>
                      <Trans>Mon empreinte</Trans>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      href="/actions"
                      onClick={() => trackEvent(headerClickActions)}
                      icon={ActionsIcon}
                      title={t('Mes gestes')}>
                      <Trans>Mes gestes</Trans>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      href={linkToClassement}
                      onClick={() => trackEvent(headerClickClassements)}
                      icon={AmisIcon}
                      activeMatches={['/classement', '/amis']}
                      title={t('Mes classements')}
                      data-cypress-id="amis-link">
                      <Trans>Mes groupes</Trans>
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <div className="flex h-full items-center gap-3">
                <PRIndicator />

                <DebugIndicator />

                <NavLink
                  href="/profil"
                  icon={ProfileIcon}
                  title={t('Profil')}
                  className="px-4 whitespace-nowrap"
                  onClick={() => trackEvent(headerClickProfil)}>
                  <Trans>Profil</Trans>
                </NavLink>

                {user?.organisation?.administratorEmail ? (
                  <>
                    <div className="my-auto h-8 w-[1px] bg-gray-200" />

                    <OrganisationLink />
                  </>
                ) : !HIDE_CTA_PATHS.find((path) => pathname.includes(path)) ? (
                  <DynamicCTAButton />
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
