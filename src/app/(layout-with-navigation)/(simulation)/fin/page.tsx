'use client'

import HowToAct from '@/components/actions/HowToAct'
import BookClosedIcon from '@/components/icons/BookClosedIcon'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import { endClickDocumentation } from '@/constants/tracking/pages/end'
import InlineLink from '@/design-system/inputs/InlineLink'
import Separator from '@/design-system/layout/Separator'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { trackEvent } from '@/utils/matomo/trackEvent'
import FeedbackBanner from './_components/FeedbackBanner'
import GetResultsByEmail from './_components/GetResultsByEmail'
import GroupModePromotionBanner from './_components/GroupModePromotionBanner'
import Poll from './_components/Poll'
import Results from './_components/Results'

export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useEndGuard()

  // Set the current simulation from the URL params (if applicable)
  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  if (!isGuardInit || isGuardRedirecting) return null

  if (!isCorrectSimulationSet) return null

  return (
    <>
      <IframeDataShareModal />

      <Poll />

      <Results />

      <div className="flex flex-col items-stretch gap-4 lg:grid lg:grid-cols-8">
        <GetResultsByEmail className="col-span-5 h-full" />

        <GroupModePromotionBanner className="col-span-3" />
      </div>

      <Separator />

      <HowToAct shouldLeadToTest={false} />

      <Separator />

      <div>
        <h2>
          <NGCTrans>Comment est calculée votre empreinte ?</NGCTrans>
        </h2>

        <p>
          <NGCTrans>
            Notre simulateur repose sur un modèle de données, dont l'intégralité
            des calculs est documentée ; les données affichées sont directement
            associées à votre test.
          </NGCTrans>
        </p>

        <InlineLink
          href="/documentation/bilan"
          className="flex items-center"
          onClick={() => trackEvent(endClickDocumentation)}>
          <BookClosedIcon className="mr-2 w-4 fill-primary-700" />

          <NGCTrans>Comprendre le calcul</NGCTrans>
        </InlineLink>
      </div>

      <FeedbackBanner
        className="mb-8 mt-12"
        text={
          <NGCTrans i18nKey="publicodes.northstar.learned">
            Est-ce que "Nos Gestes Climat" vous a permis d'apprendre quelque
            chose ?
          </NGCTrans>
        }
        type="learned"
      />
    </>
  )
}
