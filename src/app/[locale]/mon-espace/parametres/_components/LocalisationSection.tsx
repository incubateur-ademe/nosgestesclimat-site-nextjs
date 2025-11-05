import Localisation from '@/app/[locale]/(simulation)/(large-layout)/profil/_components/Localisation'
import { UserProvider } from '@/publicodes-state'

export default function LocalisationSection() {
  return (
    <section className="mt-2">
      <UserProvider>
        <Localisation />
      </UserProvider>
    </section>
  )
}
