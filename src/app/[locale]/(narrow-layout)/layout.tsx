import ContentNarrow from '@/components/layout/ContentNarrow'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function NarrowLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <ClientLayout locale={locale}>
      <Header />
      <ContentNarrow>{children}</ContentNarrow>
      <Footer />
    </ClientLayout>
  )
}
