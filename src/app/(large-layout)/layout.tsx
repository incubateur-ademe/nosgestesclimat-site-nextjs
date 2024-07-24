import ContentLarge from '@/components/layout/ContentNarrow'
import { PropsWithChildren } from 'react'

export default async function LargeLayout({ children }: PropsWithChildren) {
  return <ContentLarge>{children}</ContentLarge>
}
