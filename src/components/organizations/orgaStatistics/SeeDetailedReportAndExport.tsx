'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useFetchPollData } from '@/hooks/organizations/useFetchPollData'
import { usePathname } from 'next/navigation'
import ExportDataButton from '../ExportDataButton'

export default function SeeDetailedReportAndExport() {
  const pathname = usePathname()

  const { data: pollData } = useFetchPollData()

  return (
    <section className="mt-16 flex flex-wrap justify-center gap-4 pb-8 md:justify-normal">
      <ButtonLink size="lg" href={`${pathname}/resultats-detailles`}>
        <Trans>Voir le rapport détaillé</Trans>
      </ButtonLink>

      <ExportDataButton simulationRecaps={pollData?.simulationRecaps ?? []} />
    </section>
  )
}
