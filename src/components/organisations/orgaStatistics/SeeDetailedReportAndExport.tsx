'use client'

import PresentationChartIcon from '@/components/icons/PresentationChartIcon'
import Trans from '@/components/translation/Trans'
import {
  clickExportDataDashboardEvent,
  clickSeeDetailedReportEvent,
} from '@/constants/matomo/organisations'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useParams } from 'next/navigation'
import ExportDataButton from '../ExportDataButton'

export default function SeeDetailedReportAndExport() {
  const params = useParams()

  const { data: pollData } = useFetchPollData()

  return (
    <section className="flex flex-wrap justify-center gap-4 pb-8 md:justify-start">
      <ButtonLink
        size="lg"
        href={`/organisations/${params.slug}/resultats-detailles`}
        className="!text-sm"
        onClick={() => {
          trackEvent(clickSeeDetailedReportEvent)
        }}>
        <PresentationChartIcon className="mr-2 fill-primary-700" />

        <Trans>Voir le rapport détaillé</Trans>
      </ButtonLink>

      <ExportDataButton
        onClick={() => {
          trackEvent(clickExportDataDashboardEvent)
        }}
        simulationRecaps={pollData?.simulationRecaps ?? []}
      />
    </section>
  )
}
