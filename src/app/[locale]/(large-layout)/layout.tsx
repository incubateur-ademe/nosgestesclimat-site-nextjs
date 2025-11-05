import { ClientLayout } from '@/components/layout/ClientLayout'
import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function LargeLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <>
      <HeaderServer />
      <ClientLayout locale={locale}>
        <ContentLarge>{children}</ContentLarge>
        <Footer />
      </ClientLayout>
    </>
  )
}
