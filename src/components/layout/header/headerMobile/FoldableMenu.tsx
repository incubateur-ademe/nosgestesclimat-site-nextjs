'use client'

import Trans from '@/components/translation/trans/TransClient'
import {
  footerClickDocumentation,
  headerClickProfil,
} from '@/constants/tracking/layout'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { Suspense } from 'react'
import NavLink from '../NavLink'
import OrganisationLink from '../_components/OrganisationLink'
import ProfileIcon from '../_components/ProfileIcon'
import CTAButton from '../headerDesktop/MenuCTAButton'

export default function FoldableMenu() {
  const { user } = useUser()

  return (
    <BurgerMenu aria-labelledby="foldable-menu-title">
      {({ closeMenu, onFocus }) => (
        <nav aria-labelledby="foldable-menu-title">
          <p id="foldable-menu-title" className="sr-only">
            <Trans>Menu principal</Trans>
          </p>

          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                onFocus={onFocus}
                onClick={() => {
                  closeMenu()
                  trackEvent(headerClickProfil)
                }}
                href="/profil"
                icon={ProfileIcon}>
                Profil
              </NavLink>
            </li>

            {user?.organisation?.administratorEmail && (
              <li>
                <OrganisationLink onClick={closeMenu} />
              </li>
            )}

            <li>
              <div className="ml-2 h-[1px] w-4 bg-gray-400" />
            </li>

            <li>
              <NavLink onFocus={onFocus} onClick={closeMenu} href="/blog">
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                onFocus={onFocus}
                onClick={closeMenu}
                href="/questions-frequentes">
                FAQ
              </NavLink>
            </li>

            <li>
              <NavLink
                onFocus={onFocus}
                onClick={() => {
                  closeMenu()
                  trackEvent(footerClickDocumentation)
                }}
                href="/documentation">
                Documentation
              </NavLink>
            </li>

            <li>
              <NavLink onFocus={onFocus} onClick={closeMenu} href="/diffuser">
                Diffuser Nos Gestes Climat
              </NavLink>
            </li>

            {!user?.organisation?.administratorEmail ? (
              <li>
                <Suspense fallback={null}>
                  <CTAButton />
                </Suspense>
              </li>
            ) : null}
          </ul>
        </nav>
      )}
    </BurgerMenu>
  )
}
