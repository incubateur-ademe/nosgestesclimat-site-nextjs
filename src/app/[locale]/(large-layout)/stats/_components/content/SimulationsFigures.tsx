import TransClient from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import { useLocale } from '@/hooks/useLocale'
import { formatValue } from '../utils/formatFigure'

type Props = {
  currentMonthSimulations: number
  allSimulationsTerminees: number
}

export default function SimulationsFigures({
  allSimulationsTerminees,
  currentMonthSimulations,
}: Props) {
  const locale = useLocale()
  return (
    <div>
      <Card className="flex- flex-row justify-around gap-4 lg:h-60 lg:flex-col!">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {formatValue(allSimulationsTerminees, locale)}
          </p>{' '}
          <p className="mb-0 text-sm">
            <TransClient>simulations terminées depuis le lancement</TransClient>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {formatValue(currentMonthSimulations, locale)}
          </p>{' '}
          <p>
            <TransClient>visites ce mois-ci (en cours)</TransClient>
          </p>
        </div>
      </Card>
    </div>
  )
}
