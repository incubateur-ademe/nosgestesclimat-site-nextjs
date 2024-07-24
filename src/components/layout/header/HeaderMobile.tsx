'use client'

import Logo from '@/components/misc/Logo'
import { useIframe } from '@/hooks/useIframe'
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

  if (shouldHideMostOfContent) {
    return null
  }

  if (shouldHideMostOfContent) {
    return null
  }

  const canBeSticky = !shouldHideMostOfContent && !shouldHideSomeOfContent
  return (
    <header className="flex justify-between bg-white p-4 shadow-sm lg:hidden">
      <Logo size={shouldHideMostOfContent ? 'sm' : 'md'} />

      {!isIframeOnlySimulation && (
        <>
          <FoldableMenu />
          <BottomMenu />
        </>
      )}
    </header>
  )
}
