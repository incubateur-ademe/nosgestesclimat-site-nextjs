import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default function LargeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ContentLarge className="mt-10 px-4 lg:px-0">{children}</ContentLarge>
    </>
  )
}
