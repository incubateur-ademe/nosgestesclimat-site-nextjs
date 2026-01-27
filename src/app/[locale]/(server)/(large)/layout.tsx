import ContentLarge from '@/components/layout/ContentLarge'
import Footer from "@/components/layout/Footer"
import FooterClientShell from "@/components/layout/FooterClientShell"
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function LargeLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <>
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      {children}
    </ContentLarge>

    <FooterClientShell>
      <Footer locale={locale} />
    </FooterClientShell>
    </>
  )
}
