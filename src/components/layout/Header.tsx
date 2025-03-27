'use client'

import checkIfIsMobile from 'is-mobile'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  const isMobile = checkIfIsMobile()
  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      {isMobile && <HeaderMobile isSticky={isSticky} />}

      {/* Displayed only on desktop */}
      {!isMobile && <HeaderDesktop isSticky={isSticky} />}
    </>
  )
}
