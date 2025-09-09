import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import CategoryDistribution from './CategoryDistribution'
import FootprintBarChart from './FootprintBarChart'

type Props = {
  organisationName: string
  groupFootprint: number
  userFootprint?: number
}

export default function MeanFootprintDistribution({
  organisationName,
  groupFootprint,
  userFootprint,
}: Props) {
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
          <CategoryDistribution
            categoryValues={{
              transport: 1,
              alimentation: 2,
              logement: 3,
              divers: 4,
              'services sociétaux': 5,
            }}
          />
        </div>
      </div>
    </div>
  )
}
