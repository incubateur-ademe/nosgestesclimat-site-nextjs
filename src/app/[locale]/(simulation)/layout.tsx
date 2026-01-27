import Footer from '@/components/layout/Footer'
import WantToActBlock from '@/components/layout/footer/WantToActBlock'
import EngineProviders from '@/components/providers/EngineProviders'
import SimulationSyncProvider from '@/components/providers/simulationProviders/SimulationSyncProvider'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../../../components/layout/ClientLayout'

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
        <SimulationSyncProvider>{children}</SimulationSyncProvider>

        <Footer wantToActBlock={<WantToActBlock locale={locale} />} />
      </EngineProviders>
    </ClientLayout>
  )
}
