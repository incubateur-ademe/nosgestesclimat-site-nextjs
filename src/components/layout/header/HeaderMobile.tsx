'use client'

import Logo from '@/components/misc/Logo'
import { useIframe } from '@/hooks/useIframe'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

export default function HeaderMobile({
  shouldHideMostOfContent,
}: {
  shouldHideMostOfContent: boolean
}) {
  const { isIframeOnlySimulation } = useIframe()

  if (shouldHideMostOfContent) {
    return null
  }

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
