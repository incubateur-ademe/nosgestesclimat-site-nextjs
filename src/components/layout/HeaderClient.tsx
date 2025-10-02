'use client'

import CTAButtonsPlaceholder from '@/components/cta/CTAButtonsPlaceholder'
import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import PRIndicator from '@/components/layout/header/headerDesktop/PRIndicator'
import Logo from '@/components/misc/Logo'
import LogoLink from '@/components/misc/LogoLink'
import Trans from '@/components/translation/trans/TransClient'
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
import NavLink from './header/NavLink'
import OrganisationLink from './header/_components/OrganisationLink'
import ProfileIcon from './header/_components/ProfileIcon'
import DebugIndicator from './header/headerDesktop/DebugIndicator'
import BottomMenu from './header/headerMobile/BottomMenu'
import FoldableMenu from './header/headerMobile/FoldableMenu'

type Props = {
  isSticky?: boolean
}

const DynamicCTAButton = dynamic(
  () => import('./header/headerDesktop/MenuCTAButton'),
  {
    ssr: false,
    loading: () => <CTAButtonsPlaceholder className="w-36" />,
  }
)

export default function HeaderClient({ isSticky = true }: Props) {
  const { t } = useClientTranslation()

  const pathname = usePathname()

  const { user } = useUser()

  const { getLinkToSimulateurPage } = useSimulateurPage()

  const { isIframeOnlySimulation } = useIframe()

  return (
    <header
      className={twMerge(
        'h-20 items-center bg-white shadow-xs',
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
      <div className="absolute top-0 right-0 bottom-0 left-0 hidden h-20 w-full items-center border-b border-gray-200 bg-white shadow-xs md:flex">
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
                className="h-full"
                id="header-navigation"
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
