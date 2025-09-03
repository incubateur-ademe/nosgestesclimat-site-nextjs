'use client'

import { headerClickLogo } from '@/constants/tracking/layout'
import { useIframe } from '@/hooks/useIframe'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { twMerge } from 'tailwind-merge'
import Logo from '../misc/Logo'
import LogoLink from '../misc/LogoLink'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  const { isIframeOnlySimulation } = useIframe()

  return (
    <header
      className={twMerge(
        'h-20 items-center bg-white shadow-sm',
        isSticky ? 'sticky top-0 z-300' : ''
      )}>
      {/* Header mobile */}
      <div className="relative flex h-full md:hidden">
        {isIframeOnlySimulation ? (
          <Logo />
        ) : (
          <LogoLink onClick={() => trackEvent(headerClickLogo)} />
        )}
      </div>

      {!isIframeOnlySimulation && (
        <>
          <HeaderMobile isSticky={isSticky} />
          <HeaderDesktop isSticky={isSticky} />
        </>
      )}
    </header>
  )
}
