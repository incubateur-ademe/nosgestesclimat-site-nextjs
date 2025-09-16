import Trans from '@/components/translation/trans/TransClient'
import type { ComputedResults } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import MeanFootprintDistribution from './_components/MeanFootprintDistribution'

type Props = {
  computedResults?: ComputedResults | null
  userComputedResults?: ComputedResults | null
  simulationsCount?: number
  organisationName?: string
}

const getGroupComputedResults = (
  computedResults: ComputedResults,
  userComputedResults?: ComputedResults | null,
  simulationsCount?: number
) => {
  const adjustedSimulationsCount = userComputedResults
    ? (simulationsCount ?? 0) - 1
    : (simulationsCount ?? 0)
  // Copie profonde pour éviter de modifier l'objet original
  const tempGroupComputedResults = {
    ...computedResults,
    carbone: {
      ...computedResults.carbone,
      categories: { ...computedResults.carbone.categories },
    },
  }

  // Remove the user's footprint from the group's footprint
  tempGroupComputedResults.carbone.bilan =
    (tempGroupComputedResults.carbone.bilan -
      (userComputedResults?.carbone?.bilan ?? 0)) /
    (adjustedSimulationsCount || 1)

  // Remove the user's footprint from the group's categories
  tempGroupComputedResults.carbone.categories = Object.entries(
    tempGroupComputedResults.carbone.categories
  ).reduce(
    (acc, [key, value]) => {
      acc[key as DottedName] =
        (value -
          (userComputedResults?.carbone?.categories[key as DottedName] ?? 0)) /
        (adjustedSimulationsCount || 1)
      return acc
    },
    {} as Record<DottedName, number>
  )

  return tempGroupComputedResults
}

export default function FootprintDistribution({
  computedResults,
  userComputedResults,
  simulationsCount,
  organisationName,
}: Props) {
  if (!computedResults || typeof simulationsCount === 'undefined') return null

  const groupComputedResults = getGroupComputedResults(
    computedResults,
    userComputedResults,
    simulationsCount
  )

  return (
    <section className="mb-8">
      <h2>
        <Trans i18nKey="pollResults.distribution.title">
          Répartition des empreintes carbone
        </Trans>
      </h2>

      <MeanFootprintDistribution
        organisationName={organisationName}
        groupComputedResults={groupComputedResults}
        userComputedResults={userComputedResults}
      />
    </section>
  )
}
