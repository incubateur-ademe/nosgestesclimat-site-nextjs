import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Sources from './Sources'

type Props = {
  allSubscribers: any
  currentMonthWebsitesData: any
  currentMonthSocialsData: any
  currentMonthVisitsData: any
}

export default function AcquisitionBlock({
  allSubscribers,
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
            <p className="text-sm">
              <Trans>ce qu'on veut</Trans>
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
