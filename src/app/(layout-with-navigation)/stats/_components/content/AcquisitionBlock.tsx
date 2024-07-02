import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { formatFigure } from '../utils/formatFigure'
import Sources from './Sources'

type Props = {
  allSubscribers: any
  allSharedSimulationEventsData: any
  currentMonthWebsitesData: any
  currentMonthSocialsData: any
  currentMonthVisitsData: any
}

export default function AcquisitionBlock({
  allSubscribers,
  allSharedSimulationEventsData,
  currentMonthWebsitesData,
  currentMonthSocialsData,
  currentMonthVisitsData,
}: Props) {
  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-row gap-4">
          <Card className="flex-1">
            <strong className="text-3xl">
              {allSubscribers?.data
                ?.toString()
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') || '...'}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>inscrits à l'infolettre</Trans>
            </p>
          </Card>
          <Card className="flex-1">
            <strong className="text-3xl">
              {allSharedSimulationEventsData
                ?.toString()
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') || '...'}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>partages du simulateur</Trans>
            </p>
          </Card>
        </div>
      </div>
      <Sources
        currentMonthVisitsData={currentMonthVisitsData}
        currentMonthWebsitesData={currentMonthWebsitesData}
        currentMonthSocialsData={currentMonthSocialsData}
      />
      {/* <h3>Utilisation de l'Iframe</h3> */}
      <div className="mt-4">
        <div className="flex flex-row gap-4">
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatFigure(allSubscribers?.data) || '...'}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>inscrits à l'infolettre</Trans>
            </p>
          </Card>
          <Card className="flex-1">
            <strong className="text-3xl">
              {formatFigure(allSharedSimulationEventsData) || '...'}
            </strong>{' '}
            <p className="mb-0 text-sm">
              <Trans>partages du simulateur</Trans>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
