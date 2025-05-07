import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default function LargeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ContentLarge>{children}</ContentLarge>
      <Footer />
    </>
  )
}
