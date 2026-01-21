import EngineProviders from '@/components/providers/EngineProviders'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { UserProvider } from '@/publicodes-state'
import Localisation from './Localisation'

export default function LocalisationSection() {
  return (
    <section className="mt-2">
      <UserProvider>
        <EngineProviders supportedRegions={getSupportedRegions()}>
          <Localisation />
        </EngineProviders>
      </UserProvider>
    </section>
  )
}
