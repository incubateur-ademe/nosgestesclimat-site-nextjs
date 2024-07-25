'use client'

import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile isSticky={isSticky} />

      {/* Displayed only on desktop */}
      <HeaderDesktop isSticky={isSticky} />
    </>
  )
}
