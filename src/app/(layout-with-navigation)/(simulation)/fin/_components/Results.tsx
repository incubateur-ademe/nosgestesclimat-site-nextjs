'use client'

import Link from '@/components/Link'
import SaveIcon from '@/components/icons/SaveIcon'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import CategoriesChart from '@/components/results/CategoriesChart'
import Trans from '@/components/translation/Trans'
import {
  endClickChangeAnswers,
  endClickSaveShortcut,
} from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import { trackEvent } from '@/utils/matomo/trackEvent'
import TotalCard from './results/TotalCard'

export default function Results() {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-start justify-between">
        <Title
          className="text-lg md:text-2xl"
          title={<Trans>Votre empreinte carbone</Trans>}
        />

        <Button
          color="text"
          className="ml-auto text-base underline"
          onClick={() => {
            trackEvent(endClickSaveShortcut)

            const emailBlock = document.getElementById('email-block')
            emailBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}>
          <SaveIcon className="mr-2 w-4 fill-primary-700" />

          <Trans>Sauvegarder</Trans>
        </Button>
      </div>

      <div className="flex flex-col items-stretch justify-center md:flex-row md:gap-4">
        <TotalCard />

        <CategoriesChart />
      </div>

      <CategoriesAccordion />

      <div className="mb-8 mt-2 text-right">
        <Link
          href="/profil#answers"
          onClick={() => trackEvent(endClickChangeAnswers)}
          className="text-sm md:mt-4">
          <Trans>Modifier mes réponses</Trans>
        </Link>
      </div>
    </>
  )
}
