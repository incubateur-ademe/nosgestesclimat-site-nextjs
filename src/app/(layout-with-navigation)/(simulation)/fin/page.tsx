import HowToAct from '@/components/actions/HowToAct'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import Trans from '@/components/translation/Trans'
import { noIndexObject } from '@/constants/metadata'
import Separator from '@/design-system/layout/Separator'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import CongratulationsText from './_components/CongratulationsText'
import FeedbackBanner from './_components/FeedbackBanner'
import GetResultsByEmail from './_components/GetResultsByEmail'
import GroupModePromotionBanner from './_components/GroupModePromotionBanner'
import RedirectionIfNoResult from './_components/RedirectionIfNoResult'
import Results from './_components/Results'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Vos résultats, simulateur d'empreinte climat - Nos Gestes Climat",
    description:
      "Vos résultats de tests de notre simulateur d'empreinte carbone.",
    robots: noIndexObject,
    alternates: {
      canonical: '/fin',
    },
  })
}

export default function FinPage({
  searchParams,
}: {
  searchParams: { details?: string }
}) {
  return (
    <FormProvider>
      <IframeDataShareModal />

      <RedirectionIfNoResult details={searchParams?.details || ''} />

      <CongratulationsText />

      <Results />

      <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-5 md:flex-row">
        <GetResultsByEmail className="col-span-3 h-full" />

        <GroupModePromotionBanner className="col-span-2" />
      </div>

      <Separator className="my-8" />

      <HowToAct shouldLeadToTest={false} />

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
