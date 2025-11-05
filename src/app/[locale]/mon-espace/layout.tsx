import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderServer isSticky />

      {children}

      <Footer className="mt-16" />
    </>
  )
}
