import ContentNarrow from '@/components/layout/ContentNarrow'
import { PropsWithChildren } from 'react'

export default async function NarrowLayout({ children }: PropsWithChildren) {
  return <ContentNarrow>{children}</ContentNarrow>
}
