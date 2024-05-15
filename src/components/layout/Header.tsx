'use client'

import { usePathname } from 'next/navigation'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

export default function Header() {
  const pathname = usePathname()

  const shouldHideMostOfContent =
    pathname.includes('/simulateur') || pathname.includes('/tutoriel')

  const shouldHideSomeOfContent = pathname.includes('/fin')

  return (
    <>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile
        shouldHideMostOfContent={shouldHideMostOfContent}
        shouldHideSomeOfContent={shouldHideSomeOfContent}
      />

      {/* Displayed only on desktop */}
      <HeaderDesktop
        shouldHideMostOfContent={shouldHideMostOfContent}
        shouldHideSomeOfContent={shouldHideSomeOfContent}
      />
    </>
  )
}
