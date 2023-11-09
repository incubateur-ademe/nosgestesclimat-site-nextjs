'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import ChevronRight from '@/design-system/icons/ChevronRight'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import { usePathname } from 'next/navigation'
import NavLink from './NavLink'

export default function HeaderMobile() {
  const pathname = usePathname()

  const shouldHideMostOfContent =
    pathname.includes('/simulateur') || pathname.includes('/tutoriel')

  return (
    <header className="relative flex justify-between p-4 lg:hidden">
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
              {/*
                // TODO : uncomment when organisations are ready
                <li>
                  <NavLink
                    onClick={closeMenu}
                    href="https://sondages.nogestesclimat.fr"
                    shouldUseDefaultLink
                    icon={OrganisationIcon}>
                    Organisations
                  </NavLink>
                </li>
              */}

              <li>
                <div className="ml-2 h-[1px] w-4 bg-gray-400" />
              </li>

              <li>
                <NavLink onClick={closeMenu} href="/blog">
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink onClick={closeMenu} href="/questions-frequentes">
                  FAQ
                </NavLink>
              </li>

              <li>
                <NavLink onClick={closeMenu} href="/diffuser">
                  Diffuser Nos Gestes Climat
                </NavLink>
              </li>
            </ul>
          )}
        </BurgerMenu>
      )}

      {shouldHideMostOfContent && (
        <ButtonLink href="/" size="sm" color="text">
          <ChevronRight className="mr-2 inline-block rotate-180 transform" />{' '}
          <Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      )}

      {!shouldHideMostOfContent && (
        <ul className="fixed bottom-0 left-0 z-50 flex w-screen justify-around border-t border-gray-200 border-t-gray-200 bg-grey-100 shadow-md">
          <li className="h-full w-full">
            <NavLink
              href="/tutoriel"
              isBasePathActive
              activeMatches={['/tutoriel', '/simulateur']}
              icon={BilanIcon}
              className="flex-col  p-2 px-4"
              activeClassName="bg-white border-r border-gray-200 text-primary-500 font-bold">
              <Trans>Test</Trans>
            </NavLink>
          </li>

          <li className="h-full w-full">
            <NavLink
              className="flex-col  p-2 px-4"
              activeClassName="bg-white border-x border-gray-200 text-primary-500 font-bold"
              href="/actions"
              icon={ActionsIcon}>
              <Trans>Actions</Trans>
            </NavLink>
          </li>

          <li className="h-full w-full">
            <NavLink
              className="flex-col p-2 px-4"
              activeClassName="bg-white border-l border-gray-200 text-primary-500 font-bold"
              href="/amis"
              icon={AmisIcon}>
              <Trans>Amis</Trans>
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  )
}
