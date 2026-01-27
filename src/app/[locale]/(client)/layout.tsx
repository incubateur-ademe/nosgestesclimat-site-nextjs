import { ClientLayout } from '@/components/layout/ClientLayout'
import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import WantToActBlock from '@/components/layout/footer/WantToActBlock'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function LargeLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <>
      <ClientLayout locale={locale}>
        <HeaderServer locale={locale} />
        {children}
      </ClientLayout>
      <Footer wantToActBlock={<WantToActBlock locale={locale} />} />
    </>
  )
}
