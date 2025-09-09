import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import FootprintBarChart from './FootprintBarChart'

type Props = {
  organisationName: string
  /** Empreinte moyenne du groupe en tonnes */
  groupFootprint: number
  /** Empreinte de l'utilisateur en tonnes (optionnelle) */
  userFootprint?: number
}

export default function MeanFootprintDistribution({
  organisationName,
  groupFootprint,
  userFootprint,
}: Props) {
  return (
    <div>
      <h3>
        <Trans i18nKey="pollResults.mean_footprint_distribution.title">
          Empreinte carbone moyenne de
        </Trans>{' '}
        "{organisationName}"
      </h3>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="bg-primary-100 w-full border-0 p-6">
          <FootprintBarChart
            groupFootprint={groupFootprint}
            userFootprint={userFootprint}
            title={`Empreinte carbone moyenne de ${organisationName}`}
          />
        </Card>
        <Card className="bg-primary-100 w-full border-0 p-6">
          <FootprintBarChart
            groupFootprint={groupFootprint}
            userFootprint={userFootprint}
            title={`Empreinte carbone moyenne de ${organisationName}`}
          />
        </Card>
      </div>
    </div>
  )
}
