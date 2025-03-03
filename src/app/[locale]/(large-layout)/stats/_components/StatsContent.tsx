'use client'

import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import {
  useAllSimulationsTerminees,
  useAllTimeVisits,
  useCurrentMonthIframeVisits,
  useCurrentMonthSimulationsTerminees,
  useCurrentMonthSocials,
  useCurrentMonthVisits,
  useCurrentMonthWebsites,
  useGetSharedSimulationEvents,
} from '@/helpers/matomo'
import { useMainNewsletter } from '@/hooks/useMainNewsletter'
import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import AcquisitionBlock from './content/AcquisitionBlock'
import MetabaseIframe from './content/MetabaseIframe'
import SimulationsBlock from './content/SimulationsBlock'
import VisitsBlock from './content/VisitsBlock'
// Do not try [toRenderWithRequestData] until all [requestResults] are successful.
// Otherwise, an informative message in rendered.
const UseQueryResultHandler = ({
  requestResults,
  toRenderWithRequestData,
}: {
  requestResults: UseQueryResult<any, unknown>[]
  toRenderWithRequestData: (data: any[]) => ReactNode
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
  const currentMonthIframeVisits = useCurrentMonthIframeVisits()
  const allTimeVisits = useAllTimeVisits()
  const currentMonthSimulations = useCurrentMonthSimulationsTerminees()
  const allSimulationsTerminees = useAllSimulationsTerminees()
  const currentMonthWebsites = useCurrentMonthWebsites()
  const currentMonthSocials = useCurrentMonthSocials()
  const allSharedSimulationEvents = useGetSharedSimulationEvents()
  const { data: mainNewsletter } = useMainNewsletter()

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
                allTimeVisits={allTimeVisitsData as number}
                currentMonthVisits={currentMonthVisitsData as number}
              />
              <SimulationsBlock
                allSimulationsTerminees={allSimulationsTermineesData as number}
                currentMonthSimulations={currentMonthSimulationsData as number}
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
            allSharedSimulationEvents,
            currentMonthIframeVisits,
          ]}
          toRenderWithRequestData={([
            currentMonthWebsitesData,
            currentMonthSocialsData,
            currentMonthVisitsData,
            allSharedSimulationEventsData,
            currentMonthIframeVisitsData,
          ]) => (
            <AcquisitionBlock
              mainNewsletter={mainNewsletter}
              allSharedSimulationEventsData={
                allSharedSimulationEventsData as number
              }
              currentMonthWebsitesData={currentMonthWebsitesData as number}
              currentMonthSocialsData={currentMonthSocialsData as number}
              currentMonthVisitsData={currentMonthVisitsData as number}
              currentMonthIframeVisitsData={
                currentMonthIframeVisitsData as number
              }
            />
          )}
        />
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Données qualitatives</Trans>
        </h2>
        <p>
          <Trans>Cette section statistique est générée via Metabase.</Trans>
        </p>
        <MetabaseIframe
          id="stats-quali"
          titre="stats-quali"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/1ca406e9-7366-4cc2-8930-50b8f9fde77d#titled=false"
          height="800px"
        />{' '}
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Modes "Groupes"</Trans>
        </h2>
        <p>
          {' '}
          <Trans>
            Il est question ici des modes "Organisations" et "Challenge tes
            amis". Cette section est générée via Metabase.
          </Trans>{' '}
        </p>
        <h3>Mode "Organisations"</h3>
        <MetabaseIframe
          id="stats-orga"
          titre="stats mode orga"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/fd7c7f21-460a-44bb-865d-ceb72f3eafe2#titled=false"
        />
        <h3 className="mt-4">Mode "Challenge tes amis"</h3>
        <MetabaseIframe
          id="stats-amis"
          titre="stats-amis"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/73de06cd-a637-470b-a8a7-3ed86a06da4a#titled=false"
        />{' '}
      </div>
    </div>
  )
}
