import ContentNarrow from '@/components/layout/ContentNarrow'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default async function NarrowLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ContentNarrow>{children}</ContentNarrow>
    </>
  )
}
