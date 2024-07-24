'use client'

import Logo from '@/components/misc/Logo'
import { useIframe } from '@/hooks/useIframe'
import { twMerge } from 'tailwind-merge'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

type Props = {
  shouldBeSticky: boolean
}
export default function HeaderMobile({ shouldBeSticky }: Props) {
  const { isIframeOnlySimulation } = useIframe()

  return (
    <header
      className={twMerge(
        'flex justify-between bg-white p-4 shadow-sm lg:hidden',
        shouldBeSticky ? 'sticky top-0 z-50' : ''
      )}>
      <Logo />

      {!isIframeOnlySimulation && (
        <>
          <FoldableMenu />
          <BottomMenu />
        </>
      )}
    </header>
  )
}
