import ContentNarrow from '@/components/layout/ContentNarrow'
import Footer from "@/components/layout/Footer"
import FooterClientShell from "@/components/layout/FooterClientShell"
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function NarrowLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  return (
    <>
      <ContentNarrow>{children}</ContentNarrow>

      <FooterClientShell>
        <Footer locale={locale} />
      </FooterClientShell>
    </>
  )
}
