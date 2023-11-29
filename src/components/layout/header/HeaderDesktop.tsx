'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import PRIndicator from '@/components/layout/header/headerDesktop/PRIndicator'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import NavLink from './NavLink'
import DebugIndicator from './headerDesktop/DebugIndicator'
import ModelVersionIndicator from './headerDesktop/ModelVersionIndicator'

export default function HeaderDesktop() {
  const { t } = useClientTranslation()

  return (
    <header className="sticky top-0 z-[500] hidden h-20 items-center lg:block">
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-20 w-full items-center border-b bg-white shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-5xl justify-between gap-4 px-4">
          <div className="flex items-center gap-16">
            <div className="flex origin-left items-center justify-center">
              <Logo />
            </div>

            <nav className="h-full">
              <ul className="flex h-full ">
                <li className="px-4">
                  <NavLink
                    href="/simulateur/bilan"
                    activeMatches={['/tutoriel', '/simulateur']}
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
          <div className="flex items-center gap-4">
            <PRIndicator />
            <ModelVersionIndicator />
            <DebugIndicator />

            <NavLink href="/profil" icon={ProfileIcon} title={t('Profil')}>
              <Trans>Profil</Trans>
            </NavLink>
            {/* TODO : uncomment when organisations are ready
            <div className="mb-2 h-3 w-[1px] bg-gray-300" />

            <NavLink
              href="https://sondages.nosgestesclimat.fr"
              shouldUseDefaultLink
              icon={OrganisationIcon}>
              Organisations
            </NavLink>
          */}
          </div>
        </div>
      </div>
    </header>
  )
}
