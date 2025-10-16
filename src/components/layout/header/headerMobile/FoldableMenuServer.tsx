'use client'

import Trans from '@/components/translation/trans/TransClient'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import ProfileIcon from '../_components/ProfileIcon'
import NavLinkServer from '../NavLinkServer'

export default function FoldableMenuServer() {
  return (
    <BurgerMenu aria-labelledby="foldable-menu-title">
      {() => (
        <nav aria-labelledby="foldable-menu-title">
          <p id="foldable-menu-title" className="sr-only">
            <Trans>Menu principal</Trans>
          </p>

          <ul className="flex flex-col gap-4">
            <li>
              <NavLinkServer href="/profil" icon={ProfileIcon}>
                Profil
              </NavLinkServer>
            </li>

            <li>
              <div className="ml-2 h-[1px] w-4 bg-gray-400" />
            </li>

            <li>
              <NavLinkServer href="/blog">Blog</NavLinkServer>
            </li>

            <li>
              <NavLinkServer href="/questions-frequentes">FAQ</NavLinkServer>
            </li>

            <li>
              <NavLinkServer href="/documentation">Documentation</NavLinkServer>
            </li>

            <li>
              <NavLinkServer href="/diffuser">
                Diffuser Nos Gestes Climat
              </NavLinkServer>
            </li>
          </ul>
        </nav>
      )}
    </BurgerMenu>
  )
}
