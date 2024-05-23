'use client'

import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { UseQueryResult } from 'react-query'
import {
  useActiveEntryPages,
  useAllTime,
  useEntryPages,
  useGetSharedSimulationEvents,
  useHomepageVisitors,
  useKeywords,
  useOldWebsites,
  useSimulationsTerminees,
  useSocials,
  useTotal,
  useWebsites,
} from '../_helpers/matomo'
import IframeFigures from './content/IframeFigures'
import SimulationsBlock from './content/SimulationsBlock'
import Sources from './content/Sources'
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
  const total = useTotal()
  const simulations = useSimulationsTerminees()
  const websites = useWebsites()
  const oldWebsites = useOldWebsites()
  const socials = useSocials()
  const keywords = useKeywords()
  const entryPages = useEntryPages()
  const activeEntryPages = useActiveEntryPages()
  const allTime = useAllTime()
  const homepageVisitorsData = useHomepageVisitors()
  const sharedSimulations = useGetSharedSimulationEvents()

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
          requestResults={[allTime, simulations]}
          toRenderWithRequestData={([allTimeData, simulationsData]) => (
            <>
              <VisitsBlock
                allTime={allTimeData.value}
                simulations={simulationsData}
              />
              <SimulationsBlock
                allTime={allTimeData.value}
                simulations={simulationsData}
              />
            </>
          )}
        />
        <div className="mt-4">
          <div className="flex flex-row gap-4">
            <Card className="flex-1">
              <p className="mb-0">
                <strong className="text-3xl">
                  {homepageVisitorsData?.data?.[0]?.nb_visits
                    ?.toString()
                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') || (
                    <span>Chargement...</span>
                  )}
                </strong>{' '}
              </p>
              <p className="text-sm">
                <Trans>visites sur la page d'accueil</Trans>
              </p>
            </Card>

            <Card className="flex-1">
              <strong className="text-3xl">
                {sharedSimulations?.data?.[0]?.nb_events
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') || (
                  <span>Chargement...</span>
                )}
              </strong>{' '}
              <p className="mb-0 text-sm">
                <Trans>partages du site</Trans>
              </p>
            </Card>
          </div>
        </div>
        <UseQueryResultHandler
          requestResults={[total, websites, oldWebsites, socials, keywords]}
          toRenderWithRequestData={([
            totalData,
            websitesData,
            oldWebsitesData,
            socialsData,
            keywordsData,
          ]) => (
            <Sources
              total={totalData.value}
              websites={websitesData}
              oldWebsites={oldWebsitesData}
              socials={socialsData}
              keywords={keywordsData}
            />
          )}
        />
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Acquisition</Trans>
        </h2>
        <details>
          <Trans i18nKey={'components.stats.StatsContent.integrationEtIframes'}>
            <summary className="mb-4">En savoir plus</summary>
            <p className="mb-4">
              Les intégrations en iframe sont détéctées via le paramètre
              'iframe' dans l'URL, ceci seulement si l'intégrateur a utilisé le{' '}
              <a href="/partenaires">script dédié</a>. Ainsi, les visites via
              les iframes d'intégrateurs qui n'ont pas utilisé ce script sont
              dispersées dans les visites générales de Nos Gestes Climat. Dans
              l'attente de chiffres plus précis, ce taux est donc
              potentiellement sous-estimé par rapport à la réalité.{' '}
              <i>(Données valables pour les 30 derniers jours)</i>
            </p>
          </Trans>
        </details>
        <UseQueryResultHandler
          requestResults={[entryPages, activeEntryPages]}
          toRenderWithRequestData={([entryPagesData, activeEntryPagesData]) => (
            <div>
              <IframeFigures
                pages={entryPagesData}
                activePages={activeEntryPagesData}
              />
            </div>
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
