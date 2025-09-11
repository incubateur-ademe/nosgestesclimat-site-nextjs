import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { ComputedResults } from '@/publicodes-state/types'
import MeanFootprintDistribution from './_components/MeanFootprintDistribution'

type Props = {
  computedResults?: ComputedResults | null
  userComputedResults?: ComputedResults | null
  simulationsCount?: number
  organisationName?: string
}

export default function FootprintDistribution({
  computedResults,
  userComputedResults,
  simulationsCount,
  organisationName,
}: Props) {
  if (!computedResults || typeof simulationsCount === 'undefined') return null

  const { formattedValue: groupFootprint } = formatCarbonFootprint(
    (computedResults.carbone.bilan -
      (userComputedResults?.carbone?.bilan || 0)) /
      simulationsCount,
    {
      maximumFractionDigits: 1,
    }
  )

  const { formattedValue: userFootprint } = userComputedResults
    ? formatCarbonFootprint(
        userComputedResults?.carbone?.bilan / simulationsCount,
        {
          maximumFractionDigits: 1,
        }
      )
    : { formattedValue: undefined }

  return (
    <section>
      <h2>
        <Trans i18nKey="pollResults.distribution.title">
          Répartition des empreintes carbone
        </Trans>
      </h2>

      <MeanFootprintDistribution
        organisationName={organisationName}
        groupFootprint={parseFloat(groupFootprint)}
        userFootprint={userFootprint ? parseFloat(userFootprint) : undefined}
        simulationsCount={simulationsCount}
      />
    </section>
  )
}
