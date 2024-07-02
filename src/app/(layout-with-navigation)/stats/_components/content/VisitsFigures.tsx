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
    <div>
      <Card className="flex- flex-row justify-around gap-4 lg:h-60 lg:!flex-col">
        <div>
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
