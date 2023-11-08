'use client'

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
      <header className="relative p-4 md:hidden">
        <div>{logo}</div>

        <BurgerMenu>
          {(closeMenu) => (
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink onClick={closeMenu} href="/profil" icon={ProfileIcon}>
                  Profil
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={closeMenu}
                  href="https://sondages.nogestesclimat.fr"
                  shouldUseDefaultLink
                  icon={OrganisationIcon}>
                  Organisations
                </NavLink>
              </li>

              <li>
                <div className="ml-2 h-[1px] w-4 bg-gray-400" />
              </li>

              <li>
                <NavLink onClick={closeMenu} href="/blog">
                  Notre Blog
                </NavLink>
              </li>

              <li>
                <NavLink onClick={closeMenu} href="/questions-frequentes">
                  FAQ
                </NavLink>
              </li>

              <li>
                <NavLink onClick={closeMenu} href="/diffuser">
                  Diffuser NGC
                </NavLink>
              </li>
            </ul>
          )}
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
