import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'
import { IsDocumentationClientProvider } from './_contexts/DocumentationStateContext'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <IsDocumentationClientProvider>
      <Header />
      <ContentLarge>{children}</ContentLarge>
    </IsDocumentationClientProvider>
  )
}
