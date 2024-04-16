'use client'

import Logo from '@/components/misc/Logo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useIframe } from '@/hooks/useIframe'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

export default function HeaderMobile({
  shouldHideMostOfContent,
}: {
  shouldHideMostOfContent: boolean
}) {
  const { isIframeOnlySimulation } = useIframe()

  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-4 shadow-sm lg:hidden">
      <Logo />

      {!shouldHideMostOfContent && <FoldableMenu />}

      {shouldHideMostOfContent && !isIframeOnlySimulation ? (
        <ButtonLink href="/" size="sm" color="text">
          ←&nbsp;<NGCTrans>Revenir à l'accueil</NGCTrans>
        </ButtonLink>
      ) : null}

      {!shouldHideMostOfContent && <BottomMenu />}
    </header>
  )
}
