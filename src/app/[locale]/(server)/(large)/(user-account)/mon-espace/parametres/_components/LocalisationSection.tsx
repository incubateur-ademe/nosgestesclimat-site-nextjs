import EngineProviders from '@/components/providers/EngineProviders'
import SimulationSyncProvider from '@/components/providers/simulationProviders/SimulationSyncProvider'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { UserProvider } from '@/publicodes-state'
import Localisation from './Localisation'

export default function LocalisationSection() {
  return (
    <section className="mt-2">
      <UserProvider>
        <EngineProviders supportedRegions={getSupportedRegions()}>
          <SimulationSyncProvider>
            <Localisation />
          </SimulationSyncProvider>
        </EngineProviders>
      </UserProvider>
    </section>
  )
}
