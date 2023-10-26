import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import CongratulationsText from './_components/CongratulationsText'
import FeedbackBanner from './_components/FeedbackBanner'
import GetResultsByEmail from './_components/GetResultsByEmail'
import GroupModePromotionBanner from './_components/GroupModePromotionBanner'
import HowToAct from './_components/HowToAct'
import Results from './_components/Results'

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

      <div className="flex flex-col gap-4">
        <GetResultsByEmail />

        <GroupModePromotionBanner />
      </div>

      <Separator className="my-8" />

      <HowToAct />

      <FeedbackBanner
        className="mb-8 mt-12"
        text={
          <Trans i18nKey="publicodes.northstar.learned">
            Est-ce que "Nos Gestes Climat" vous a permis d'apprendre quelque
            chose ?
          </Trans>
        }
        type="learned"
      />
    </FormProvider>
  )
}
