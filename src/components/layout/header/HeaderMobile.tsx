'use client'

import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import ChevronRight from '@/design-system/icons/ChevronRight'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { usePathname } from 'next/navigation'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

export default function HeaderMobile() {
  const pathname = usePathname()

  const shouldHideMostOfContent =
    pathname.includes('/simulateur') || pathname.includes('/tutoriel')

  return (
    <header className="relative flex justify-between p-4 lg:hidden">
      <Logo />

      {!shouldHideMostOfContent && <FoldableMenu />}

      {shouldHideMostOfContent && (
        <ButtonLink href="/" size="sm" color="text">
          <ChevronRight className="mr-2 inline-block rotate-180 transform" />{' '}
          <Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      )}

      {!shouldHideMostOfContent && <BottomMenu />}
    </header>
  )
}
