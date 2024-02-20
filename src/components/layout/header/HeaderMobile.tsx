'use client'

import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
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
    <header className="sticky top-0 z-50 flex justify-between bg-white p-4 shadow-sm md:hidden">
      <Logo />

      {!shouldHideMostOfContent && <FoldableMenu />}

      {shouldHideMostOfContent && !isIframeOnlySimulation ? (
        <ButtonLink href="/" size="sm" color="text">
          ←&nbsp;<Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      ) : null}

      {!shouldHideMostOfContent && <BottomMenu />}
    </header>
  )
}
