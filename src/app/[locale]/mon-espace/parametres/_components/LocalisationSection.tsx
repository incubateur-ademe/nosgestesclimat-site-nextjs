import Localisation from '@/app/[locale]/(simulation)/(large-layout)/profil/_components/Localisation'
import { STORAGE_KEY } from '@/constants/storage'
import { UserProvider } from '@/publicodes-state'
import type { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'

export default function LocalisationSection({
  supportedRegions,
}: {
  supportedRegions: SupportedRegions
}) {
  return (
    <section className="mt-2">
      <UserProvider
        storageKey={STORAGE_KEY}
        migrationInstructions={migrationInstructions}>
        <Localisation supportedRegions={supportedRegions} />
      </UserProvider>
    </section>
  )
}
