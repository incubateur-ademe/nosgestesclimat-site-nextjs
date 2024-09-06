import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useLocale } from '@/hooks/useLocale'
import { formatPercentage, formatValue } from '../utils/formatFigure'
import Sources from './Sources'

type Props = {
  allSubscribers: any
  allSharedSimulationEventsData: any
  currentMonthWebsitesData: any
  currentMonthSocialsData: any
  currentMonthVisitsData: any
  currentMonthIframeVisitsData: any
}

export default function AcquisitionBlock({
  allSubscribers,
  allSharedSimulationEventsData,
  currentMonthWebsitesData,
  currentMonthSocialsData,
  currentMonthVisitsData,
  currentMonthIframeVisitsData,
}: Props) {
  const locale = useLocale()
  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-row gap-4">
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatValue(allSubscribers?.data, locale)}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>inscrits à l'infolettre</Trans>
            </p>
          </Card>
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatValue(allSharedSimulationEventsData, locale)}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>partages du simulateur</Trans>
            </p>
          </Card>
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatPercentage(
                currentMonthIframeVisitsData / currentMonthVisitsData
              )}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>de visites via iframe ce mois-ci</Trans>
            </p>
          </Card>
        </div>
      </div>
      <Sources
        currentMonthVisitsData={currentMonthVisitsData}
        currentMonthWebsitesData={currentMonthWebsitesData}
        currentMonthSocialsData={currentMonthSocialsData}
      />
    </div>
  )
}
