'use client'

import Link from '@/components/Link'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import CategoriesChart from '@/components/results/CategoriesChart'
import Trans from '@/components/translation/Trans'
import {
  endClickChangeAnswers,
  endClickSaveShortcut,
} from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { trackEvent } from '@/utils/matomo/trackEvent'
import TotalCard from './results/TotalCard'

export default function Results() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-0 text-lg">
          <Trans>Votre bilan</Trans>
        </h2>

        <Button
          color="text"
          className="text-base underline"
          onClick={() => {
            trackEvent(endClickSaveShortcut)

            const emailBlock = document.getElementById('email-block')
            emailBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}>
          <Emoji className="mr-2 inline-block">📩</Emoji>
          <Trans>Sauvegarder</Trans>
        </Button>
      </div>

      <div className="flex flex-col items-stretch justify-center md:flex-row md:gap-4">
        <TotalCard />

        <CategoriesChart />
      </div>

      <CategoriesAccordion />

      <div className="mt-2 text-right">
        <Link
          href="/profil#answers"
          onClick={() => trackEvent(endClickChangeAnswers)}
          className="text-sm md:mt-4">
          <Trans>Modifier mes réponses</Trans>
        </Link>
      </div>

      <Separator />
    </>
  )
}
