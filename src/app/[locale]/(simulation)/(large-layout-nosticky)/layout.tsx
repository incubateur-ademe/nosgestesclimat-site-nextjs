import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'
import type { PropsWithChildren } from 'react'

export default function LargeLayoutNoSticky({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderServer isSticky={false} />
      <ContentLarge className="px-4 lg:px-0">{children}</ContentLarge>
    </>
  )
}
