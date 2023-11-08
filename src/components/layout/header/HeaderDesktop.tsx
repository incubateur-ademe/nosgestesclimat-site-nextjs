'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import OrganisationIcon from '@/components/icons/OrganisationIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import Navigation from '../Navigation'
import NavLink from './NavLink'

export default function HeaderDesktop() {
  return (
    <header className="sticky top-0 z-50 hidden gap-4 border-b bg-white shadow-sm lg:block">
      <div className="mx-auto flex max-w-5xl justify-between gap-4 ">
        <div className="flex items-center gap-16">
          <Logo />

          <Navigation>
            <li className="px-4">
              <NavLink
                href="/tutoriel"
                isBasePathActive
                activeMatches={['/tutoriel', '/simulateur']}
                icon={BilanIcon}>
                <Trans>Bilan</Trans>
              </NavLink>
            </li>

            <li className="px-4">
              <NavLink href="/actions" icon={ActionsIcon}>
                <Trans>Actions</Trans>
              </NavLink>
            </li>

            <li className="px-4">
              <NavLink href="/amis" icon={AmisIcon}>
                <Trans>Amis</Trans>
              </NavLink>
            </li>
          </Navigation>
        </div>

        <div className="flex items-center gap-4">
          <NavLink href="/profil" icon={ProfileIcon}>
            Profil
          </NavLink>

          <div className="mb-2 h-3 w-[1px] bg-gray-300" />

          <NavLink
            href="https://sondages.nosgestesclimat.fr"
            shouldUseDefaultLink
            icon={OrganisationIcon}>
            Organisations
          </NavLink>
        </div>
      </div>
    </header>
  )
}
