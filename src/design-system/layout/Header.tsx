import Link from '@/components/Link'
import OrganisationIcon from '@/components/icons/OrganisationIcon'
import ProfileIcon from '@/components/icons/ProfileIcon'
import { JSX } from 'react'
import BurgerMenu from './BurgerMenu'
import NavLink from './header/NavLink'

export default function Header({
  logo,
  navigation,
}: {
  logo: JSX.Element
  navigation: JSX.Element
}) {
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
      <header className="hidden gap-4 md:block">
        <div className="mx-auto flex max-w-5xl justify-between gap-4 py-4">
          <div>
            {logo}

            {navigation}
          </div>

          <div className="flex items-center gap-4">
            <NavLink href="/profil">
              <ProfileIcon className="h-4 w-4 group-hover:stroke-primary" />
              Profil
            </NavLink>

            <div className="h-3 w-[1px] bg-gray-300" />
            <NavLink
              href="https://sondages.nogestesclimat.fr"
              shouldUseDefaultLink>
              <OrganisationIcon className="h-4 w-4 group-hover:stroke-primary" />
              Organisations
            </NavLink>
          </div>
        </div>
      </header>
    </>
  )
}
