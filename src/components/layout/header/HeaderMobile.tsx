'use client'

import Logo from '@/components/misc/Logo'
import LogoLink from '@/components/misc/LogoLink'
import { headerClickLogo } from '@/constants/tracking/layout'
import { useIframe } from '@/hooks/useIframe'
import { trackEvent } from '@/utils/analytics/trackEvent'
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
        'relative flex justify-between bg-white p-4 shadow-xs md:hidden',
        isSticky ? 'sticky top-0 z-50' : ''
      )}>
      {isIframeOnlySimulation ? (
        <Logo />
      ) : (
        <LogoLink onClick={() => trackEvent(headerClickLogo)} />
      )}

      {!isIframeOnlySimulation && (
        <>
          <FoldableMenu />
          <BottomMenu />
        </>
      )}
    </header>
  )
}
