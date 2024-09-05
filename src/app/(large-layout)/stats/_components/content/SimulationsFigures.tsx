import Trans from '@/components/translation/Trans'
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
      <Card className="flex- flex-row justify-around gap-4 lg:h-60 lg:!flex-col">
        <div>
          <p className="mb-0 text-3xl font-bold">
            {formatValue(allSimulationsTerminees, locale)}
          </p>{' '}
          <p className="mb-0 text-sm">
            <Trans>simulations terminées depuis le lancement</Trans>
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-0 text-3xl font-bold">
            {formatValue(currentMonthSimulations, locale)}
          </p>{' '}
          <p>
            <Trans>visites ce mois-ci (en cours)</Trans>
          </p>
        </div>
      </Card>
    </div>
  )
}
