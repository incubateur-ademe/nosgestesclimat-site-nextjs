import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useIsOrganisationAdmin } from '@/hooks/organisations/useIsOrganisationAdmin'
import type { ComputedResults } from '@/publicodes-state/types'
import type { Categories } from '@incubateur-ademe/nosgestesclimat'
import CategoryDistribution from './CategoryDistribution'
import CategoryRadarChart from './CategoryRadarChart'
import FootprintBarChart from './FootprintBarChart'

type Props = {
  organisationName?: string
  groupFootprint: number
  userFootprint?: number
  computedResults?: ComputedResults | null
  userComputedResults?: ComputedResults | null
  simulationsCount?: number
}

export default function MeanFootprintDistribution({
  organisationName,
  groupFootprint,
  userFootprint,
  computedResults,
  userComputedResults,
  simulationsCount,
}: Props) {
  const { isAdmin } = useIsOrganisationAdmin()

  if (!computedResults) return null

  const {
    transport: meanTransport,
    alimentation: meanAlimentation,
    logement: meanLogement,
    divers: meanDivers,
    'services sociétaux': meanServices,
  } = Object.entries(computedResults.carbone.categories).reduce(
    (accObject, [key, value]) => {
      const { formattedValue: meanValue } = formatCarbonFootprint(
        value -
          (userComputedResults?.carbone?.categories?.[key as Categories] || 0),
        {
          maximumFractionDigits: 1,
        }
      )

      accObject[key as Categories] =
        parseFloat(meanValue) / (simulationsCount ?? 1)

      return accObject
    },
    {
      transport: 0,
      alimentation: 0,
      logement: 0,
      divers: 0,
      'services sociétaux': 0,
    } as Record<Categories, number>
  )

  return (
    <div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full">
          <h3 className="mb-6 font-bold">
            <Trans i18nKey="pollResults.mean_footprint_distribution.title">
              Empreinte carbone moyenne de
            </Trans>{' '}
            "{organisationName}"
          </h3>

          <Card className="bg-primary-100 w-full border-0 p-6">
            <FootprintBarChart
              groupFootprint={groupFootprint}
              userFootprint={userFootprint}
            />
          </Card>
        </div>
        <div className="w-full">
          {(isAdmin || !userComputedResults) && (
            <CategoryDistribution
              categoryValues={{
                transport: meanTransport,
                alimentation: meanAlimentation,
                logement: meanLogement,
                divers: meanDivers,
                'services sociétaux': meanServices,
              }}
            />
          )}
          {!isAdmin && userComputedResults && (
            <CategoryRadarChart
              userValues={Object.entries(
                userComputedResults.carbone.categories
              ).reduce(
                (accObject, [key, value]) => {
                  accObject[key as Categories] = parseFloat(
                    formatCarbonFootprint(value, { maximumFractionDigits: 1 })
                      .formattedValue
                  )
                  return accObject
                },
                {
                  transport: 0,
                  alimentation: 0,
                  logement: 0,
                  divers: 0,
                  'services sociétaux': 0,
                } as Record<Categories, number>
              )}
              averageValues={{
                transport: meanTransport,
                alimentation: meanAlimentation,
                logement: meanLogement,
                divers: meanDivers,
                'services sociétaux': meanServices,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
