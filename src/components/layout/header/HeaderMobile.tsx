'use client'

import Logo from '@/components/misc/Logo'
import { useIframe } from '@/hooks/useIframe'
import { twMerge } from 'tailwind-merge'
import BottomMenu from './headerMobile/BottomMenu'
import FoldableMenu from './headerMobile/FoldableMenu'

type Props = {
  isSticky: boolean
}
export default function HeaderMobile({ isSticky }: Props) {
  const { isIframeOnlySimulation } = useIframe()

  return (
    <header
      className={twMerge(
        'flex justify-between bg-white p-4 shadow-sm lg:hidden',
        isSticky ? 'sticky top-0 z-50' : ''
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
