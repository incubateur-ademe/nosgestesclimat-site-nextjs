'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useFetchPollData } from '@/hooks/organizations/useFetchPollData'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { Organization } from '@/types/organizations'
import { formatValue } from 'publicodes'
import DetailedOrgaStatistics from './DetailedOrgaStatistics'
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

  const { data: pollData } = useFetchPollData({
    fileName,
    userId: user?.id,
    email: user?.email,
  })

  type SimulationRecap = {
    bilan: number
    categories: {
      [key: string]: number
    }
    defaultAdditionalQuestions: Record<string, number | string>
    progression: number
    isCurrentUser?: boolean
  }
  // Create a mock poll data with the same structure as the real one using the SimulationRecap type with 200 entries
  // where bilan should be equal to the sum of the categories and the random values should be floats of 2 decimals
  const mockPollData = {
    simulationsRecap: Array.from({ length: 200 }, () => {
      const categories = {
        transport: parseFloat(
          formatValue(Math.random() * 6 - 1, { precision: 1 })
        ),
        logement: parseFloat(
          formatValue(Math.random() * 6 - 1, { precision: 1 })
        ),
        alimentation: parseFloat(
          formatValue(Math.random() * 6 - 1, { precision: 1 })
        ),
        divers: parseFloat(
          formatValue(Math.random() * 6 - 2, { precision: 1 })
        ),
        'services sociétaux': parseFloat(
          formatValue(Math.random() * 6 - 2, { precision: 1 })
        ),
      }
      return {
        bilan: Object.values(categories).reduce((acc, value) => acc + value, 0),
        categories,
        defaultAdditionalQuestions: {},
        progression: Math.random(),
      }
    }),
  }

  return (
    <>
      <Title tag="h2" title={<Trans>Chiffres clés</Trans>} />

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks pollData={mockPollData} />

        {mockPollData?.simulationsRecap?.length <= 0 && <ResultsSoonBanner />}
      </section>

      <DetailedOrgaStatistics pollData={mockPollData} />
    </>
  )
}
