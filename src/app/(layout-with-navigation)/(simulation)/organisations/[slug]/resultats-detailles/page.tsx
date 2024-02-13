'use client'

import ExportDataButton from '@/components/organisations/ExportDataButton'
import OrgaStatistics from '@/components/organisations/OrgaStatistics'
import Trans from '@/components/translation/Trans'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import { FiltersContext } from './_components/FiltersProvider'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'

// // Create a function than randomly returns a postal code from France among 20 possible values
// function getRandomPostalCode() {
//   const postalCodes = [
//     '75001',
//     '75002',
//     '75003',
//     '75004',
//     '75005',
//     '75006',
//     '75007',
//     '75008',
//     '75009',
//     '75010',
//     '75011',
//     '75012',
//     '75013',
//     '75014',
//     '75015',
//     '75016',
//     '75017',
//     '75018',
//     '75019',
//     '75020',
//   ]
//   return postalCodes[Math.floor(Math.random() * postalCodes.length)]
// }

export default function ResultatsDetaillesPage() {
  const params = useParams()
  const { data: pollData } = useFetchPollData({ orgaSlug: String(params.slug) })

  // // Create a mock poll data with the same structure as the real one using the SimulationRecap type with 200 entries
  // // where bilan should be equal to the sum of the categories and the random values should be floats of 2 decimals
  // const mockPollData = useRef({
  //   funFacts: {
  //     percentageOfBicycleUsers: 10,
  //     percentageOfVegetarians: 23.299,
  //     percentageOfCarOwners: 76.9,
  //   },
  //   simulationRecaps: Array.from({ length: 200 }, () => {
  //     const categories = {
  //       transport: parseFloat(String(Math.random() * 6).slice(0, 4)),
  //       logement: parseFloat(String(Math.random() * 6).slice(0, 4)),
  //       alimentation: parseFloat(String(Math.random() * 6).slice(0, 4)),
  //       divers: parseFloat(String(Math.random() * 6).slice(0, 4)),
  //       'services sociétaux': parseFloat(String(Math.random() * 6).slice(0, 4)),
  //     }
  //     return {
  //       bilan: Object.values(categories).reduce((acc, value) => acc + value, 0),
  //       categories,
  //       defaultAdditionalQuestionsAnswers: {
  //         // Add a date property to the simulation recap, randomly set to a date between 1960 and 2024 included
  //         birthDate: new Date(
  //           Math.floor(Math.random() * (2024 - 1960 + 1)) + 1960,
  //           Math.floor(Math.random() * 12),
  //           Math.floor(Math.random() * 31)
  //         ).toISOString(),
  //         postalCode: getRandomPostalCode(),
  //       },
  //       progression: 1,
  //       isCurrentUser: Math.random() > 0.99,
  //       date: new Date().toISOString(),
  //     }
  //   }),
  // }).current

  const { ageFilters, postalCodeFilters } = useContext(FiltersContext)

  const filteredSimulationRecaps =
    pollData &&
    filterSimulationRecaps({
      simulationRecaps: pollData?.simulationRecaps,
      ageFilters,
      postalCodeFilters,
    })

  return (
    <div className="pt-12">
      <div className="mb-10 flex flex-wrap items-center justify-between md:flex-nowrap">
        <h1>
          <Trans>Résultats détaillés</Trans>
        </h1>

        <ExportDataButton
          simulationRecaps={pollData?.simulationRecaps ?? []}
          color="secondary"
        />
      </div>

      <OrgaStatisticsFilters
        simulationRecaps={pollData?.simulationRecaps ?? []}
        filteredSimulationRecaps={filteredSimulationRecaps ?? []}
      />

      <OrgaStatistics
        simulationRecaps={filteredSimulationRecaps ?? []}
        funFacts={pollData?.funFacts}
        title={<Trans>Chiffres clés</Trans>}
      />

      <OrgaStatisticsCharts simulationRecaps={filteredSimulationRecaps ?? []} />
    </div>
  )
}
