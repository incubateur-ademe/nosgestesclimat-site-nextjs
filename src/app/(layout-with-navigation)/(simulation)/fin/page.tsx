'use client'

import HowToAct from '@/components/actions/HowToAct'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
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

      <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-5 md:flex-row">
        <GetResultsByEmail className="col-span-3 h-full" />

        <GroupModePromotionBanner className="col-span-2" />
      </div>

      <Separator />

      <HowToAct shouldLeadToTest={false} />

      <Separator />

      <div>
        <h2>
          <Trans>Comment est calculée votre empreinte ?</Trans>
        </h2>

        <p>
          <Trans>
            Notre simulateur repose sur un modèle de données, dont l'intégralité
            des calculs est documentée ; les données affichées sont directement
            associées à votre test.
          </Trans>
        </p>

        <InlineLink href="/documentation/bilan">
          <Emoji className="mr-1 inline-block">🧮</Emoji>
          <Trans>Comprendre le calcul</Trans>
        </InlineLink>
      </div>

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
    </>
  )
}
