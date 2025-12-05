import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import { ServerLayout } from '@/components/layout/ServerLayout'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function LargeLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <>
      <HeaderServer />
      <ServerLayout locale={locale}>
        <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
          {children}
        </ContentLarge>
        <Footer />
      </ServerLayout>
    </>
  )
}
