'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import PRIndicator from '@/components/layout/header/headerDesktop/PRIndicator'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { usePathname } from 'next/navigation'
import NavLink from './NavLink'
import CTAButton from './headerDesktop/CTAButton'
import DebugIndicator from './headerDesktop/DebugIndicator'
import ModelVersionIndicator from './headerDesktop/ModelVersionIndicator'

const HIDE_CTA_PATHS = ['/fin', '/simulateur/bilan', '/tutoriel']

export default function HeaderDesktop() {
  const { t } = useClientTranslation()

  const pathname = usePathname()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  let testHref = ''
  if (!currentSimulation?.progression) {
    testHref = '/tutoriel'
  } else if (currentSimulation?.progression < 1) {
    testHref = '/simulateur/bilan'
  } else {
    testHref = '/fin'
  }

  return (
    <header className="sticky top-0 z-[500] hidden h-20 items-center lg:block">
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-20 w-full items-center border-b bg-white shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-5xl justify-between gap-4 ">
          <div className="flex items-center gap-16">
            <div className="flex origin-left items-center justify-center">
              <Logo />
            </div>

            <nav className="h-full">
              <ul className="flex h-full ">
                <li className="px-4">
                  <NavLink
                    href={testHref}
                    activeMatches={['/tutoriel', '/simulateur', '/fin']}
                    icon={BilanIcon}
                    title={t('Le test')}>
                    <Trans>Le test</Trans>
                  </NavLink>
                </li>

                <li className="px-4">
                  <NavLink
                    href="/actions"
                    icon={ActionsIcon}
                    title={t('Actions')}>
                    <Trans>Actions</Trans>
                  </NavLink>
                </li>

                <li className="px-4">
                  <NavLink
                    href="/amis"
                    icon={AmisIcon}
                    title={t('Amis')}
                    data-cypress-id="amis-link">
                    <Trans>Amis</Trans>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-8">
            <PRIndicator />
            <ModelVersionIndicator />
            <DebugIndicator />

            <NavLink href="/profil" icon={ProfileIcon} title={t('Profil')}>
              <Trans>Profil</Trans>
            </NavLink>

            {!HIDE_CTA_PATHS.find((path) => pathname.includes(path)) ? (
              <CTAButton progression={currentSimulation?.progression || 0} />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
