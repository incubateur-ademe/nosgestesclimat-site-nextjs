'use client'

import Link from '@/components/Link'
import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import OrganisationIcon from '@/components/icons/OrganisationIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import Trans from '@/components/translation/Trans'
import { JSX } from 'react'
import BurgerMenu from './BurgerMenu'
import Navigation from './Navigation'
import NavLink from './header/NavLink'

export default function Header({ logo }: { logo: JSX.Element }) {
  return (
    <>
      {/* Mobile */}
      <header className="md:hidden">
        {logo}

        <BurgerMenu>
          <ul>
            <li>
              <Link href="/profil" className="">
                Profil
              </Link>
            </li>

            <li>
              <Link href="https://sondages.nogestesclimat.fr" className="">
                Organisations
              </Link>
            </li>
          </ul>
        </BurgerMenu>
      </header>

      {/* Desktop */}
      <header className="sticky top-0 z-50 hidden gap-4 border-b bg-white shadow-sm md:block">
        <div className="mx-auto flex max-w-5xl justify-between gap-4 ">
          <div className="flex items-center gap-16">
            {logo}

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
              href="https://sondages.nogestesclimat.fr"
              shouldUseDefaultLink
              icon={OrganisationIcon}>
              Organisations
            </NavLink>
          </div>
        </div>
      </header>
    </>
  )
}
