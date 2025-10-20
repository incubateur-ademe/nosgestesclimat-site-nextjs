import Footer from '@/components/layout/Footer'
import EngineProviders from '@/components/providers/EngineProviders'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function SimulateurLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params
  const supportedRegions = getSupportedRegions()

  return (
    <ClientLayout
      skipLinksDisplayed={new Set(['main', 'footer'])}
      locale={locale}>
      <EngineProviders supportedRegions={supportedRegions}>
        {children}

        <Footer />
      </EngineProviders>
    </ClientLayout>
  )
}
