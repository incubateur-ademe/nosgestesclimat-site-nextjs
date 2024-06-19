import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

type Props = {
  currentMonthSimulations: number
  allSimulationsTerminees: number
}

export default function SimulationsFigures({
  allSimulationsTerminees,
  currentMonthSimulations,
}: Props) {
  return (
    <div className="flex flex-row gap-4 md:!flex-col">
      <Card className="flex-1 gap-4">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {allSimulationsTerminees
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>simulations terminées depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {currentMonthSimulations
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
