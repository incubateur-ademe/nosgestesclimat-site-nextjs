import ProfileIcon from '@/components/icons/ProfileIcon'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import NavLink from '../NavLink'

export default function FoldableMenu() {
  return (
    <BurgerMenu>
      {({ closeMenu, onFocus }) => (
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              onFocus={onFocus}
              onClick={closeMenu}
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
              onClick={closeMenu}
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
