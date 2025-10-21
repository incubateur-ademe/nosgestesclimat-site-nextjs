import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/HeaderClient'
import type { PropsWithChildren } from 'react'

export default function LargeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
        {children}
      </ContentLarge>
    </>
  )
}
