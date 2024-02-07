'use client'

import ExportDataButton from '@/components/organizations/ExportDataButton'
import OrgaStatistics from '@/components/organizations/OrgaStatistics'
import Trans from '@/components/translation/Trans'
import { useFetchPollData } from '@/hooks/organizations/useFetchPollData'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'

export default function ResultatsDetaillesPage() {
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
        transport: parseFloat(String(Math.random() * 6).slice(0, 4)),
        logement: parseFloat(String(Math.random() * 6).slice(0, 4)),
        alimentation: parseFloat(String(Math.random() * 6).slice(0, 4)),
        divers: parseFloat(String(Math.random() * 6).slice(0, 4)),
        'services sociétaux': parseFloat(String(Math.random() * 6).slice(0, 4)),
      }
      return {
        bilan: Object.values(categories).reduce((acc, value) => acc + value, 0),
        categories,
        defaultAdditionalQuestions: {},
        progression: 1,
        isCurrentUser: Math.random() > 0.99,
        date: new Date().toISOString(),
      }
    }),
  }

  return (
    <div className="pt-12">
      <div className="mb-10 flex flex-wrap items-center justify-between md:flex-nowrap">
        <h1>
          <Trans>Résultats détaillés</Trans>
        </h1>

        <ExportDataButton
          // We only want to export the complete simulations
          simulationsRecap={mockPollData?.simulationsRecap.filter(
            ({ progression }) => progression === 1
          )}
          color="secondary"
        />
      </div>

      <OrgaStatisticsFilters />

      <OrgaStatistics title={<Trans>Chiffres clés</Trans>} />

      <OrgaStatisticsCharts />
    </div>
  )
}
