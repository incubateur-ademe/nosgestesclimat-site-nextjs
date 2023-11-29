'use client'

import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  useActiveEntryPages,
  useAllTime,
  useEntryPages,
  useGetSharedSimulationEvents,
  useHomepageVisitors,
  useKeywords,
  useKmHelp,
  useOldWebsites,
  usePages,
  usePeriod,
  useReference,
  useRidesNumber,
  useSimulationsTerminees,
  useSimulationsfromKmHelp,
  useSocials,
  useTotal,
  useVisitsAvgDuration,
  useVisitsDuration,
  useWebsites,
} from '../_helpers/matomo'
import Chart from './content/Chart'
import DurationChart from './content/DurationChart'
import DurationFigures from './content/DurationFigures'
import Evolution from './content/Evolution'
import IframeFigures from './content/IframeFigures'
import KmFigures from './content/KmFigures'
import ScoreFromURL from './content/ScoreFromURL'
import Sources from './content/Sources'

// Do not try [toRenderWithRequestData]  until all [requestResults] are successful.
// Otherwise, an informative message in rendered.
const UseQueryResultHandler = ({ requestResults, toRenderWithRequestData }) => {
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
                : {error.message}
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
  const duration = useVisitsDuration()
  const avgduration = useVisitsAvgDuration()
  const websites = useWebsites()
  const oldWebsites = useOldWebsites()
  const socials = useSocials()
  const keywords = useKeywords()
  const period = usePeriod()
  const reference = useReference()
  const entryPages = useEntryPages()
  const activeEntryPages = useActiveEntryPages()
  const pages = usePages()
  const allTime = useAllTime()
  const kmhelp = useKmHelp()
  const simulationsfromhelp = useSimulationsfromKmHelp()
  const ridesnumber = useRidesNumber()
  const homepageVisitorsData = useHomepageVisitors()
  const sharedSimulations = useGetSharedSimulationEvents()

  const { t } = useClientTranslation()

  return (
    <div>
      <Title title={<Trans>Statistiques</Trans>} />
      <div className="mt-8">
        <h2>
          <Trans>Générales</Trans>
        </h2>
        <UseQueryResultHandler
          requestResults={[period, reference, allTime, simulations]}
          toRenderWithRequestData={([
            periodData,
            referenceData,
            allTimeData,
            simulationsData,
          ]) => (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Evolution
                period={periodData.value}
                reference={referenceData.value}
                allTime={allTimeData.value}
                simulations={simulationsData}
              />
              <Chart key="visites" elementAnalysedTitle={t('visites')} />
            </div>
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
          <Chart
            name="chart-simulation-terminees"
            elementAnalysedTitle={t('simulations terminées')}
            target="Events.getAction&label=A%20termin%C3%A9%20la%20simulation%0A"
            tooltipLabel={t('simulations terminées')}
            key="chart-simulation-terminees"
            color="#30C691"
          />
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
        <h3>
          <Trans>Intégrations et Iframes</Trans>
        </h3>
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
        <h3>
          <Trans>Northstar: les statistiques "étoile du nord"</Trans>
        </h3>
        <Trans i18nKey={'components.stats.StatsContent.infosNorthstar'}>
          <p>
            En fin de simulation, une bannière apparaît afin de recueillir le
            sentiment de nos utilisateurs sur le rôle de Nos Gestes Climat dans
            leur compréhension des enjeux climat mais également dans
            l'incitation au passage à l'action via 2 questions en fin de test.
            Les statistiques, disponibles sur la page dédiée{' '}
            <a href="./northstar">page dédiée "Northstar"</a>, ont été générées
            via Metabase.
          </p>
        </Trans>
      </div>
      <div className="mt-8">
        <h3>
          <Trans>Durée des visites</Trans>
        </h3>
        <details>
          <Trans i18nKey={'components.stats.StatsContent.dureeDesVisites'}>
            <summary className="mb-4">En savoir plus</summary>
            <p>
              Cette section est générée à partir des visites des 60 derniers
              jours. Les visites dont le temps passé sur le site est inférieur à
              1 minute ont été écartées. Pour éviter le biais de l'iframe qui
              peut générer des visiteurs inactifs dans les statistiques, le
              temps moyen sur le site a été calculé à partir des visites actives
              (l'utilisateur a cliqué sur "Faire le test").
            </p>
          </Trans>
        </details>
        <UseQueryResultHandler
          requestResults={[avgduration]}
          toRenderWithRequestData={([avgdurationData]) => (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <DurationFigures avgduration={avgdurationData} />
              {duration.isSuccess && <DurationChart duration={duration.data} />}
            </div>
          )}
        />
      </div>
      <div className="mt-8">
        <h3>
          <Trans>Score de nos utilisateurs</Trans>
        </h3>
        <details>
          <Trans i18nKey={'components.stats.StatsContent.scoreUtilisateurs'}>
            <summary className="mb-4">En savoir plus</summary>
            <p>
              Bien sûr, nous ne collectons pas{' '}
              <a href="/vie-priv%C3%A9e">les données utlisateurs</a>. Néanmoins,
              le score total ainsi que l'empreinte par catégorie est présente
              dans l'URL de fin de test. Dans cette section, nous agrégeons cees
              informations pour avoir une idée de l'empreinte carbone moyenne de
              nos utilisateurs et de distribution du score afin d'analyser ces
              résultats dans le contexte des évolutions du modèle.
            </p>{' '}
            <p>
              L'objectif ici n'est pas d'évaluer l'empreinte carbone des
              Français : à priori, les utilisateurs du tests de sont pas
              représentatifs des Français. De plus, ces données peuvent être
              biaisées par des utilisateurs qui reviendraient à plusieurs
              reprises sur la page de fin, en changeant ses réponses au test (ce
              qui crée de nouveaux url de fin).
            </p>
          </Trans>
        </details>
        <UseQueryResultHandler
          requestResults={[pages]}
          toRenderWithRequestData={([pagesData]) => (
            <div>
              <ScoreFromURL pages={pagesData} />
            </div>
          )}
        />
      </div>
      <div className="mt-8">
        <h3>
          <Trans>La voiture en chiffres</Trans>
        </h3>
        <UseQueryResultHandler
          requestResults={[kmhelp, simulationsfromhelp, ridesnumber]}
          toRenderWithRequestData={([
            kmhelpData,
            simulationsfromhelpData,
            ridesnumberData,
          ]) => (
            <KmFigures
              kmhelp={kmhelpData}
              simulationsfromhelp={simulationsfromhelpData?.nb_visits}
              ridesnumber={ridesnumberData?.nb_events}
            />
          )}
        />
      </div>
    </div>
  )
}
