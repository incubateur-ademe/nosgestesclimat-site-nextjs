import EngineProviders from '@/components/providers/EngineProviders'
import { UserProvider } from '@/publicodes-state'
import Localisation from './Localisation'

export default function LocalisationSection() {
  return (
    <section className="mt-2">
      <UserProvider>
        <EngineProviders>
          <Localisation />
        </EngineProviders>
      </UserProvider>
    </section>
  )
}
