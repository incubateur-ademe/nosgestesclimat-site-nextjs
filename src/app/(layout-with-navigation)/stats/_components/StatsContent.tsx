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
  useGetSharedSimulationEvents,
} from '../_helpers/matomo'
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
          ]}
          toRenderWithRequestData={([
            currentMonthWebsitesData,
            currentMonthSocialsData,
            currentMonthVisitsData,
            allSharedSimulationEventsData,
          ]) => (
            <AcquisitionBlock
              allSubscribers={allSubscribers}
              allSharedSimulationEventsData={allSharedSimulationEventsData}
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
          id="test"
          titre="test"
          src="http://metabase-ngc.osc-fr1.scalingo.io/public/dashboard/2cb00116-100f-4c22-b72e-a45e86ae3fea?tab=9-qualitatif#titled=false"
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
        {/* <MetabaseIframe
          id="stats-orga"
          titre="stats mode orga"
          src="http://metabase-ngc.osc-fr1.scalingo.io/public/dashboard/2cb00116-100f-4c22-b72e-a45e86ae3fea?tab=7-organisations#titled=false"
        /> */}
        <h3 className="mt-4">Mode "Challenge tes amis"</h3>
        {/* <MetabaseIframe
          id="test"
          titre="test"
          src="http://metabase-ngc.osc-fr1.scalingo.io/public/dashboard/2cb00116-100f-4c22-b72e-a45e86ae3fea?tab=8-groupes-d%27amis#titled=false"
        />{' '} */}
      </div>
    </div>
  )
}
