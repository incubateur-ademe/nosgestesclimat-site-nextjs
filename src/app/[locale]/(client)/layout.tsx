import { ClientLayout } from '@/components/layout/ClientLayout'
import Footer from '@/components/layout/Footer'
import FooterClientShell from '@/components/layout/FooterClientShell'
import HeaderServer from '@/components/layout/HeaderServer'
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
      <FooterClientShell>
        <Footer pathname={`/${locale}`} locale={locale} />
      </FooterClientShell>
    </>
  )
}
