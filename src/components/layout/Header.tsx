'use client'

import { Suspense } from 'react'
import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  return (
    <Suspense fallback={null}>
      {/* Displayed only on mobile (screens < 768px) */}
      <HeaderMobile isSticky={isSticky} />

      {/* Displayed only on desktop */}
      <HeaderDesktop isSticky={isSticky} />
    </Suspense>
  )
}
