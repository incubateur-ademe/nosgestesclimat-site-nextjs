'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { profilClickCtaCommencer } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import TutorialLink from './_components/TutorialLink'

export default function SimulationNotStarted() {
  return (
    <Card className="my-4 flex !w-[35rem] max-w-full flex-1 items-start gap-2 self-start border-none bg-gray-100 md:p-8">
      <p className="w-full text-center md:text-left">
        <span
          role="img"
          aria-label="hole emoji"
          className="mb-2 block text-center text-3xl md:mr-4 md:mb-0 md:inline-block">
          🕳️
        </span>
        <TransClient>Vous n'avez pas encore fait le test.</TransClient>
      </p>

      <div className="flex w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start">
        <ButtonLink
          href={getLinkToSimulateur()}
          trackingEvent={profilClickCtaCommencer}>
          <ProgressCircle className="mr-2" white />
          <TransClient>Faire le test</TransClient>
        </ButtonLink>

        <TutorialLink className="w-auto" />
      </div>
    </Card>
  )
}
