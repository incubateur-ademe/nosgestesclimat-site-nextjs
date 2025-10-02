import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/HeaderClient'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function LargeLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <ClientLayout locale={locale}>
      <Header />
      <ContentLarge>{children}</ContentLarge>
      <Footer />
    </ClientLayout>
  )
}
