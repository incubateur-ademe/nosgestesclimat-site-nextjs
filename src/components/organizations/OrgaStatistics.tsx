'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { useFetchPollData } from '@/hooks/organizations/useFetchPollData'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { usePathname } from 'next/navigation'
import { formatValue } from 'publicodes'
import FunFacts from './orgaStatistics/FunFacts'
import ResultsSoonBanner from './orgaStatistics/ResultsSoonBanner'
import SeeDetailedReportAndExport from './orgaStatistics/SeeDetailedReportAndExport'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function OrgaStatistics({
  title,
}: {
  title?: string | JSX.Element
}) {
  const locale = useLocale()

  const pathname = usePathname()

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

  // Create a mock poll data with the same structure as the real one using the SimulationRecap type with 200 entries
  // where bilan should be equal to the sum of the categories and the random values should be floats of 2 decimals
  const mockPollData = {
    funFacts: {
      percentageOfBicycleUsers: 10,
      percentageOfVegetarians: 23.299,
      percentageOfCarOwners: 76.9,
    },
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
      <h2 className="mt-12">{title ?? <Trans>Statistiques</Trans>}</h2>

      <Separator />

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks pollData={mockPollData} />

        {mockPollData?.simulationsRecap?.length <= 0 && <ResultsSoonBanner />}
      </section>

      <FunFacts funFacts={mockPollData?.funFacts} />

      {!pathname.includes('resultats-detailles') && (
        <SeeDetailedReportAndExport />
      )}
    </>
  )
}
