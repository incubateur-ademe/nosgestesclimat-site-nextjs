'use client'

import HeaderDesktop from './header/HeaderDesktop'
import HeaderMobile from './header/HeaderMobile'

type Props = {
  isSticky?: boolean
}
export default function Header({ isSticky = true }: Props) {
  return (
    <>
      <HeaderMobile isSticky={isSticky} />

      <HeaderDesktop isSticky={isSticky} />
    </>
  )
}
