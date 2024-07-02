import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { formatFigure } from '../utils/formatFigure'

type Props = {
  currentMonthSimulations: number
  allSimulationsTerminees: number
}

export default function SimulationsFigures({
  allSimulationsTerminees,
  currentMonthSimulations,
}: Props) {
  return (
    <div>
      <Card className="flex- flex-row justify-around gap-4 lg:h-60 lg:!flex-col">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {formatFigure(allSimulationsTerminees)}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>simulations terminées depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {formatFigure(currentMonthSimulations)}
          </p>{' '}
          <p>
            <Trans>visites ce mois-ci (en cours)</Trans>
          </p>
        </div>
      </Card>
    </div>
  )
}
