import ContentNarrow from '@/components/layout/ContentNarrow'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default function NarrowLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ContentNarrow>{children}</ContentNarrow>
      <Footer />
    </>
  )
}
