'use client'

import { usePathname } from 'next/navigation'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

export default function Header() {
  const pathname = usePathname()

  const shouldHide =
    pathname.includes('/simulateur') || pathname.includes('/tutoriel')

  const shouldBeSticky = pathname.includes('/fin')

  if (shouldHide) return null

  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile shouldBeSticky={shouldBeSticky} />

      {/* Displayed only on desktop */}
      <HeaderDesktop shouldBeSticky={shouldBeSticky} />
    </>
  )
}
