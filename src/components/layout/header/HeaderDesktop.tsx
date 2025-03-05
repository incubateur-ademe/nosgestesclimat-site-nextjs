'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import PRIndicator from '@/components/layout/header/headerDesktop/PRIndicator'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import {
  headerClickActions,
  headerClickLogo,
  headerClickProfil,
  headerClickTest,
} from '@/constants/tracking/layout'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'
import NavLink from './NavLink'
import ProfileIcon from './_components/ProfileIcon'
import DebugIndicator from './headerDesktop/DebugIndicator'

type Props = {
  isSticky: boolean
}
export default function HeaderDesktop({ isSticky }: Props) {
  const { t } = useClientTranslation()

  const { getLinkToSimulateurPage } = useSimulateurPage()

  return (
    <header
      className={twMerge(
        '!hidden h-20 items-center lg:!block',
        isSticky ? 'sticky top-0 z-50' : ''
      )}>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-20 w-full items-center border-b bg-white shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-6">
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
            </ul>
          </nav>

          <div className="flex h-full items-center gap-3">
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
          </div>
        </div>
      </div>
    </header>
  )
}
