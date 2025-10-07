import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'
import { IsDocumentationClientProvider } from './_contexts/DocumentationStateContext'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params

  return (
    <ClientLayout locale={locale}>
      <IsDocumentationClientProvider>
        <Header />
        <ContentLarge tag="div">{children}</ContentLarge>
        <Footer />
      </IsDocumentationClientProvider>
    </ClientLayout>
  )
}
