'use client'

import { usePathname } from 'next/navigation'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

export default function Header() {
  const pathname = usePathname()

  const shouldHideMostOfContent =
    pathname.includes('/simulateur') || pathname.includes('/tutoriel')

  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile shouldHideMostOfContent={shouldHideMostOfContent} />

      {/* Displayed only on desktop */}
      <HeaderDesktop />
    </>
  )
}
