'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useFetchPollData } from '@/hooks/organizations/useFetchPollData'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { Organization } from '@/types/organizations'
import ResultsSoonBanner from './orgaStatistics/ResultsSoonBanner'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function OrgaStatistics({
  organization,
}: {
  organization: Organization
}) {
  const locale = useLocale()

  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : 'FR'

  const fileName = `co2-model.${regionCode}-lang.${locale}.json`

  const { data: pollData } = useFetchPollData(fileName)

  return (
    <>
      <Title tag="h2" title={<Trans>Statistiques</Trans>} />

      <section className="relative flex gap-4">
        <StatisticsBlocks pollData={pollData} />

        {(organization?.polls?.[0]?.simulations?.length <= 0 ||
          pollData?.simulations?.length <= 0) && <ResultsSoonBanner />}
      </section>
    </>
  )
}
