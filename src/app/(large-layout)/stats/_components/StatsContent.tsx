'use client'

import Trans from '@/components/translation/Trans'
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
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { UseQueryResult } from '@tanstack/react-query'
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
  const currentMonthIframeVisits = useCurrentMonthIframeVisits()
  const allTimeVisits = useAllTimeVisits()
  const currentMonthSimulations = useCurrentMonthSimulationsTerminees()
  const allSimulationsTerminees = useAllSimulationsTerminees()
  const currentMonthWebsites = useCurrentMonthWebsites()
  const currentMonthSocials = useCurrentMonthSocials()
  const allSharedSimulationEvents = useGetSharedSimulationEvents()
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
              allSubscribers={allSubscribers}
              allSharedSimulationEventsData={allSharedSimulationEventsData}
              currentMonthWebsitesData={currentMonthWebsitesData}
              currentMonthSocialsData={currentMonthSocialsData}
              currentMonthVisitsData={currentMonthVisitsData}
              currentMonthIframeVisitsData={currentMonthIframeVisitsData}
            />
          )}
        />
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Données qualitatives</Trans>
        </h2>
        <p>
          <Trans i18nKey={'components.stats.StatsContent.infosNorthstar'}>
            En fin de simulation, pour 10% de nos utilisateurs, nous proposons à
            nos utilisateurs de répondre à la question suivante :{' '}
            <strong>D’après vous, quel est votre le plus important ?</strong>.
            L'idée est d'évaluer l'effet de nos améliorations pédagogiques.
            Cette section statistique est générée via Metabase.
          </Trans>
        </p>
        <MetabaseIframe
          id="stats-quali"
          titre="stats-quali"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/f36c5cc4-abb9-4ac6-98b5-13bed7318e7d#titled=false"
          height="800px"
        />{' '}
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Modes "Groupes"</Trans>
        </h2>
        <p>
          {' '}
          <Trans i18nKey={'components.stats.StatsContent.infosNorthstar'}>
            Il est question ici des modes "Organisations" et "Challenge tes
            amis". Cette section est générée via Metabase.
          </Trans>{' '}
        </p>
        <h3>Mode "Organisations"</h3>
        <MetabaseIframe
          id="stats-orga"
          titre="stats mode orga"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/f64f2de4-fc94-431e-a6c0-01f9c0095267#titled=false"
        />
        <h3 className="mt-4">Mode "Challenge tes amis"</h3>
        <MetabaseIframe
          id="stats-amis"
          titre="stats-amis"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/8a32d8a6-3716-40a7-9ce0-f9991c54acf4#titled=false"
        />{' '}
      </div>
    </div>
  )
}
