import Trans from '@/components/translation/Trans'
import { profilClickCtaCommencer } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import TutorialLink from './_components/TutorialLink'

export default function SimulationNotStarted() {
  return (
    <Card className="my-4 flex !w-[35rem] max-w-full items-start gap-2 border-none bg-gray-100 md:p-8">
      <p>
        <span
          role="img"
          aria-label="hole emoji"
          className="mb-2 mr-4 block text-center text-3xl md:mb-0 md:inline-block">
          🕳️
        </span>
        <Trans>Vous n'avez pas encore fait le test.</Trans>
      </p>

      <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center">
        <ButtonLink
          href={getLinkToSimulateur()}
          trackingEvent={profilClickCtaCommencer}>
          <ProgressCircle className="mr-2" white />
          <Trans>Faire le test</Trans>
        </ButtonLink>

        <TutorialLink className="w-auto" />
      </div>
    </Card>
  )
}
