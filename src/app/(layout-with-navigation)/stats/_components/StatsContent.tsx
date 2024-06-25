'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { UseQueryResult } from 'react-query'
import {
  useAllSimulationsTerminees,
  useAllTimeVisits,
  useCurrentMonthSimulationsTerminees,
  useCurrentMonthSocials,
  useCurrentMonthVisits,
  useCurrentMonthWebsites,
} from '../_helpers/matomo'
import AcquisitionBlock from './content/AcquisitionBlock'
import SimulationsBlock from './content/SimulationsBlock'
import VisitsBlock from './content/VisitsBlock'

// Do not try [toRenderWithRequestData] until all [requestResults] are successful.
// Otherwise, an informative message in rendered.
const UseQueryResultHandler = ({
  requestResults,
  toRenderWithRequestData,
}: {
  requestResults: UseQueryResult<any, unknown>[]
  toRenderWithRequestData: (data: any[]) => JSX.Element
}) => {
  const notSuccessfulRequests = requestResults.filter(
    ({ isSuccess }) => !isSuccess
  )

  if (notSuccessfulRequests.length > 0) {
    return (
      <div>
        {notSuccessfulRequests.map(({ error, isError, isLoading }, index) => {
          if (isError) {
            return (
              <p key={`${JSON.stringify(error)}-${index}`}>
                <Trans>
                  Une erreur est survenue lors de la récupération des données
                </Trans>{' '}
                : {(error as any).message}
              </p>
            )
          }
          if (isLoading) {
            return (
              <p key={`${JSON.stringify(error)}-${index}`}>
                <Trans>Récupération des données</Trans>...
              </p>
            )
          }
        })}
      </div>
    )
  }

  return toRenderWithRequestData(requestResults.map(({ data }) => data))
}

export default function StatsContent() {
  const currentMonthVisits = useCurrentMonthVisits()
  const allTimeVisits = useAllTimeVisits()
  const currentMonthSimulations = useCurrentMonthSimulationsTerminees()
  const allSimulationsTerminees = useAllSimulationsTerminees()
  const currentMonthWebsites = useCurrentMonthWebsites()
  const currentMonthSocials = useCurrentMonthSocials()
  const allSubscribers = useNumberSubscribers()

  return (
    <div>
      <Title>
        <Trans>Statistiques</Trans>
      </Title>
      <div className="mt-8">
        <h2>
          <Trans>Visites et simulations</Trans>
        </h2>
        <UseQueryResultHandler
          requestResults={[
            allTimeVisits,
            currentMonthVisits,
            allSimulationsTerminees,
            currentMonthSimulations,
          ]}
          toRenderWithRequestData={([
            allTimeVisitsData,
            currentMonthVisitsData,
            allSimulationsTermineesData,
            currentMonthSimulationsData,
          ]) => (
            <>
              <VisitsBlock
                allTimeVisits={allTimeVisitsData}
                currentMonthVisits={currentMonthVisitsData}
              />
              <SimulationsBlock
                allSimulationsTerminees={allSimulationsTermineesData}
                currentMonthSimulations={currentMonthSimulationsData}
              />
            </>
          )}
        />
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Acquisition</Trans>
        </h2>
        <UseQueryResultHandler
          requestResults={[
            currentMonthWebsites,
            currentMonthSocials,
            currentMonthVisits,
          ]}
          toRenderWithRequestData={([
            currentMonthWebsitesData,
            currentMonthSocialsData,
            currentMonthVisitsData,
          ]) => (
            <AcquisitionBlock
              allSubscribers={allSubscribers}
              currentMonthWebsitesData={currentMonthWebsitesData}
              currentMonthSocialsData={currentMonthSocialsData}
              currentMonthVisitsData={currentMonthVisitsData}
            />
          )}
        />
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Données qualitatives</Trans>
        </h2>
        <Trans i18nKey={'components.stats.StatsContent.infosNorthstar'}>
          <p>
            En fin de simulation, pour 10% de nos utilisateurs blabla. Cette
            section statistique est générées via Metabase.
          </p>
        </Trans>
      </div>
    </div>
  )
}
