import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

type Props = {
  allTime: number
  simulations: Record<string, any>
}

export default function Figures({ allTime, simulations }: Props) {
  // We didn't track this stat at the beginning so we're guessing based on todays average completion
  const baseSimulations = 32015

  // const { data: lastMonthData } = useChart({
  //   chartDate: '1',
  //   chartPeriod: 'month',
  //   method: 'VisitsSummary.getVisits',
  //   name: 'visites-figure',
  //   targets: [],
  // })

  const lastMonthData = 0

  return (
    <div className="flex flex-row gap-4 md:!flex-col">
      <Card className="flex-1 gap-4">
        <div className="m-0">
          <p className="mb-0 text-4xl font-bold">
            {allTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>visites depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">{lastMonthData}</p>{' '}
          <p>
            <Trans>visites ce mois-ci</Trans>
          </p>
        </div>
      </Card>

      <Card className="flex-1 gap-4">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {(simulations?.nb_visits + baseSimulations)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>simulations terminées depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">{lastMonthData}</p>{' '}
          <p>
            <Trans>visites ce mois-ci</Trans>
          </p>
        </div>
      </Card>
    </div>
  )
}
