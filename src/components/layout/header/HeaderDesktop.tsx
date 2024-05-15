'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import PRIndicator from '@/components/layout/header/headerDesktop/PRIndicator'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import {
  headerClickActions,
  headerClickClassements,
  headerClickLogo,
  headerClickProfil,
  headerClickTest,
} from '@/constants/tracking/layout'
import { HIDE_CTA_PATHS } from '@/constants/urls'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import NavLink from './NavLink'
import OrganisationLink from './_components/OrganisationLink'
import ProfileIcon from './_components/ProfileIcon'
import CTAButton from './headerDesktop/CTAButton'
import DebugIndicator from './headerDesktop/DebugIndicator'

type Props = {
  shouldHideMostOfContent: boolean
  shouldHideSomeOfContent: boolean
}
export default function HeaderDesktop({
  shouldHideMostOfContent,
  shouldHideSomeOfContent,
}: Props) {
  const { t } = useClientTranslation()

  const pathname = usePathname()

  const { user } = useUser()

  const { getLinkToSimulateurPage } = useSimulateurPage()

  const canBeSticky = !shouldHideMostOfContent && !shouldHideSomeOfContent

  return (
    <header
      className={twMerge(
        'hidden h-20 items-center lg:block',
        canBeSticky ? 'sticky top-0 z-50' : ''
      )}>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-20 w-full items-center border-b bg-white shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-6xl justify-between gap-6">
          <div className="flex items-center justify-between gap-20">
            <div className="flex origin-left items-center justify-center">
              <Logo onClick={() => trackEvent(headerClickLogo)} />
            </div>

            <nav className="h-full">
              <ul className="flex h-full flex-1 justify-start gap-4">
                <li>
                  <NavLink
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
                    <Trans>Mes classements</Trans>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <PRIndicator />

            <DebugIndicator />

            <NavLink
              href="/profil"
              icon={ProfileIcon}
              title={t('Profil')}
              className="px-4"
              onClick={() => trackEvent(headerClickProfil)}>
              <Trans>Profil</Trans>
            </NavLink>

            {user?.organisation?.administratorEmail ? (
              <>
                <div className="my-auto h-8 w-[1px] bg-gray-200" />

                <OrganisationLink />
              </>
            ) : !HIDE_CTA_PATHS.find((path) => pathname.includes(path)) ? (
              <CTAButton />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
