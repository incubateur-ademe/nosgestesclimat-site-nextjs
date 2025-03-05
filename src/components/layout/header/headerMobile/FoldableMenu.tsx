'use client'

import {
  footerClickDocumentation,
  headerClickProfil,
} from '@/constants/tracking/layout'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import { trackEvent } from '@/utils/matomo/trackEvent'
import NavLink from '../NavLink'
import ProfileIcon from '../_components/ProfileIcon'

export default function FoldableMenu() {
  return (
    <BurgerMenu>
      {({ closeMenu, onFocus }) => (
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
        </ul>
      )}
    </BurgerMenu>
  )
}
