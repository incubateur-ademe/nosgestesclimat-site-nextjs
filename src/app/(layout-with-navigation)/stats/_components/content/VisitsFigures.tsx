import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

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
            {allTimeVisits
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>visites depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {currentMonthVisits
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p>
            <Trans>visites ce mois-ci (en cours)</Trans>
          </p>
        </div>
      </Card>
    </div>
  )
}
