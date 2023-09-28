import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { Diapo } from '@/types/fin'
import FinSlider from './_components/FinSlider'
import { NewsletterForm } from './_components/NewsletterForm'
import './slick.css'

export function generateMetadata() {
  return getMetadataObject({
    title: "Vos résultats, simulateur d'empreinte climat - Nos Gestes Climat",
    description:
      "Vos résultats de tests de notre simulateur d'empreinte carbone.",
  })
}

export default function FinPage({
  searchParams,
}: {
  searchParams: Record<string, Diapo>
}) {
  return (
    <FormProvider>
      <NorthStarBanner type="learned" />

      <IframeDataShareModal />

      <div className="mb-12 flex justify-start md:mx-16">
        <ButtonLink size="sm" color="secondary" href="/simulateur/bilan">
          ← Revenir au test
        </ButtonLink>
      </div>

      <FinSlider searchParams={searchParams} />

      <NewsletterForm />
    </FormProvider>
  )
}
