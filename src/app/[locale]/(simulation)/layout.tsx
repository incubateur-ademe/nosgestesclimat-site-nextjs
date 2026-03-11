import Footer from '@/components/layout/Footer'
import EngineProviders from '@/components/providers/EngineProviders'
import SimulationSyncProvider from '@/components/providers/simulationProviders/SimulationSyncProvider'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../../../components/layout/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function SimulateurLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params

  return (
    <ClientLayout
      skipLinksDisplayed={new Set(['main', 'footer'])}
      locale={locale}>
      <EngineProviders>
        <SimulationSyncProvider>{children}</SimulationSyncProvider>

        <Footer locale={locale} />
      </EngineProviders>
    </ClientLayout>
  )
}
