import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
import { PropsWithChildren } from 'react'

export default async function LargeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ContentLarge>{children}</ContentLarge>
    </>
  )
}
