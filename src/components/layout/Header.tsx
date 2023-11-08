'use client'

import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

export default function Header() {
  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile />

      {/* Displayed only on desktop */}
      <HeaderDesktop />
    </>
  )
}
