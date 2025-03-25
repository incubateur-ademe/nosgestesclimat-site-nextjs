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
      <HeaderMobile isSticky={isSticky} />

      <HeaderDesktop isSticky={isSticky} />
    </>
  )
}
