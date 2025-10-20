'use client'

import PlaySignIcon from '@/components/icons/PlaySignIcon'
import Trans from '@/components/translation/trans/TransClient'
import { profilClickCtaCommencer } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import TutorialLink from './_components/TutorialLink'

export default function SimulationNotStarted() {
  return (
    <Card className="my-4 flex w-[35rem]! max-w-full flex-1 items-start gap-2 self-start border-none bg-gray-100 md:p-8">
      <p className="w-full text-center md:text-left">
        <span
          role="img"
          aria-hidden
          className="mb-2 block text-center text-3xl md:mr-4 md:mb-0 md:inline-block">
          🕳️
        </span>
        <Trans>Vous n'avez pas encore fait le test.</Trans>
      </p>

      <ul className="flex w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start">
        <li>
          <ButtonLink
            href={getLinkToSimulateur()}
            trackingEvent={profilClickCtaCommencer}>
            <PlaySignIcon className="mr-2 fill-white" />
            <Trans>Faire le test</Trans>
          </ButtonLink>
        </li>

        <li>
          <TutorialLink className="w-auto" />
        </li>
      </ul>
    </Card>
  )
}
