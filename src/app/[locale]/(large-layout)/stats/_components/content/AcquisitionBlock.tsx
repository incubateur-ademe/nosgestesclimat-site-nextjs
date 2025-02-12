import TransClient from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import { useLocale } from '@/hooks/useLocale'
import type { Newsletter } from '@/hooks/useMainNewsletter'
import { formatPercentage, formatValue } from '../utils/formatFigure'
import Sources from './Sources'

type Props = {
  mainNewsletter?: Newsletter
  allSharedSimulationEventsData: any
  currentMonthWebsitesData: any
  currentMonthSocialsData: any
  currentMonthVisitsData: any
  currentMonthIframeVisitsData: any
}

export default function AcquisitionBlock({
  mainNewsletter,
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
            {!!mainNewsletter && (
              <strong className="text-3xl">
                {formatValue(mainNewsletter.totalSubscribers, locale)}
              </strong>
            )}
            <p className="mb-0 text-sm">
              <TransClient>inscrits à l'infolettre</TransClient>
            </p>
          </Card>
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatValue(allSharedSimulationEventsData, locale)}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <TransClient>partages du calculateur</TransClient>
            </p>
          </Card>
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatPercentage(
                currentMonthIframeVisitsData / currentMonthVisitsData
              )}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <TransClient>de visites via iframe ce mois-ci</TransClient>
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
