import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { formatFigure } from '../utils/formatFigure'

type Props = {
  allTimeVisits: number
  currentMonthVisits: number
}

export default function VisitsFigures({
  allTimeVisits,
  currentMonthVisits,
}: Props) {
  return (
    <div className="flex flex-row gap-4 md:!flex-col">
      <Card className="flex-1 gap-4">
        <div className="m-0">
          <p className="mb-0 text-4xl font-bold">
            {formatFigure(allTimeVisits)}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>visites depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {formatFigure(currentMonthVisits)}
          </p>{' '}
          <p>
            <Trans>visites ce mois-ci (en cours)</Trans>
          </p>
        </div>
      </Card>
    </div>
  )
}
