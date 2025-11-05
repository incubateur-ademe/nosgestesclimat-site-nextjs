import { ClientLayout } from '@/components/layout/ClientLayout'
import ContentNarrow from '@/components/layout/ContentNarrow'
import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function NarrowLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <>
      <HeaderServer />
      <ClientLayout locale={locale}>
        <ContentNarrow>{children}</ContentNarrow>
        <Footer />
      </ClientLayout>
    </>
  )
}
