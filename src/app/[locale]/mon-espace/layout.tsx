import HeaderServer from '@/components/layout/HeaderServer'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderServer isSticky />

      {children}
    </>
  )
}
