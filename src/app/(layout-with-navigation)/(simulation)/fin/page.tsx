import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import Separator from '@/design-system/layout/Separator'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import CongratulationsText from './_components/CongratulationsText'
import GroupModePromotionBanner from './_components/GroupModePromotionBanner'
import GetResultsByEmail from './_components/getResultsByEmail/GetResultsByEmail'
import HowToAct from './_components/howToAct/HowToAct'
import Results from './_components/results/Results'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Vos résultats, simulateur d'empreinte climat - Nos Gestes Climat",
    description:
      "Vos résultats de tests de notre simulateur d'empreinte carbone.",
  })
}

export default function FinPage() {
  return (
    <FormProvider>
      <IframeDataShareModal />

      <CongratulationsText />

      <Results />

      <GetResultsByEmail />

      <GroupModePromotionBanner />

      <Separator className="my-8" />

      <HowToAct />
    </FormProvider>
  )
}
