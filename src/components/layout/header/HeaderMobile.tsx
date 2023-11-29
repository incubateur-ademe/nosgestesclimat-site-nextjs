'use client'

import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

export default function HeaderMobile({
  shouldHideMostOfContent,
}: {
  shouldHideMostOfContent: boolean
}) {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-4 shadow-sm md:px-8 lg:hidden">
      <Logo />

      {!shouldHideMostOfContent && <FoldableMenu />}

      {shouldHideMostOfContent && (
        <ButtonLink href="/" size="sm" color="text">
          ←&nbsp;<Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      )}

      {!shouldHideMostOfContent && <BottomMenu />}
    </header>
  )
}
