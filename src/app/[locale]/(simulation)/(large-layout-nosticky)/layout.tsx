import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default function LargeLayoutNoSticky({ children }: PropsWithChildren) {
  return (
    <>
      <Header isSticky={false} />
      <ContentLarge className="px-4 lg:px-0">{children}</ContentLarge>
    </>
  )
}
