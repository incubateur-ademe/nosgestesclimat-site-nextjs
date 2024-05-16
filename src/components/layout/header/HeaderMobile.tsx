'use client'

import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useIframe } from '@/hooks/useIframe'
import { twMerge } from 'tailwind-merge'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

type Props = {
  shouldHideMostOfContent: boolean
  shouldHideSomeOfContent: boolean
}
export default function HeaderMobile({
  shouldHideMostOfContent,
  shouldHideSomeOfContent,
}: Props) {
  const { isIframeOnlySimulation } = useIframe()

  const canBeSticky = !shouldHideMostOfContent && !shouldHideSomeOfContent
  return (
    <header
      className={twMerge(
        'flex justify-between bg-white p-4 shadow-sm lg:hidden',
        canBeSticky ? 'sticky top-0 z-50' : ''
      )}>
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
