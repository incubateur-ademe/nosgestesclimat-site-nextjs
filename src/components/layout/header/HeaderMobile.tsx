'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import OrganisationIcon from '@/components/icons/OrganisationIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import { usePathname } from 'next/navigation'
import NavLink from './NavLink'

export default function HeaderMobile() {
  const pathname = usePathname()

  const shouldHideMostOfContent =
    pathname.includes('/simulateur') || pathname.includes('/tutoriel')

  return (
    <header className="relative p-4 lg:hidden">
      <Logo />

      {!shouldHideMostOfContent && (
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
      )}

      {!shouldHideMostOfContent && (
        <ul className="fixed bottom-0 left-0 z-10 flex w-screen justify-around border-t border-gray-200 border-t-gray-200 bg-white p-4 shadow-md">
          <li className="px-4">
            <NavLink
              href="/tutoriel"
              isBasePathActive
              activeMatches={['/tutoriel', '/simulateur']}
              icon={BilanIcon}
              className="flex-col">
              <Trans>Bilan</Trans>
            </NavLink>
          </li>

          <li className="px-4">
            <NavLink className="flex-col" href="/actions" icon={ActionsIcon}>
              <Trans>Actions</Trans>
            </NavLink>
          </li>

          <li className="px-4">
            <NavLink className="flex-col" href="/amis" icon={AmisIcon}>
              <Trans>Amis</Trans>
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  )
}
