import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default async function LargeLayoutNoSticky({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Header isSticky={false} />
      <ContentLarge>{children}</ContentLarge>
    </>
  )
}
