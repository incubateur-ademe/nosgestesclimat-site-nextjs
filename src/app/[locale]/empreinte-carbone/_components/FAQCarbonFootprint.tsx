import FAQ from '@/components/landing-pages/FAQ'
import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function FAQCarbonFootprint() {
  const { t } = await getServerTranslation()

  return (
    <FAQ
      className="mb-16"
      subTitle={<Trans>Vos questions sur l'empreinte carbone</Trans>}
      questions={[
        {
          question: (
            <Trans>
              Qu’est-ce que le carbone et pourquoi est-il important ?
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  Le carbone est un élément chimique nécessaire à la vie sur
                  Terre. Il se trouve dans les végétaux, dans le sol, dans les
                  océans et dans l’atmosphère principalement sous forme de
                  dioxyde de carbone (CO2e).
                </Trans>
              </p>
              <p>
                <Trans>
                  Le carbone, CO2e, est le principal gaz à effet de serre, mais
                  il y en a d’autres : méthane, protoxyde d’azote par exemple.
                  C’est pourquoi on parle “d’équivalent carbone”.
                </Trans>
              </p>
              <p className="mb-0">
                <Trans>
                  Ces émissions bouleversent le climat, contribuant au
                  réchauffement global et à ses conséquences dévastatrices :
                  montée du niveau des océans, multiplication des catastrophes
                  naturelles et extinction d’une partie du vivant.
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: <Trans>Comment définir l'empreinte carbone ?</Trans>,
          answer: (
            <>
              <p>
                <Trans>
                  L’empreinte carbone désigne la quantité totale de gaz à effet
                  de serre (GES) émis directement et indirectement par une
                  personne par ses activités sur une année.
                </Trans>
              </p>

              <p>
                <Trans>
                  Le dioxyde de carbone, CO2, est le principal gaz à effet de
                  serre, mais il y en a d’autres : méthane, protoxyde d’azote
                  par exemple. C’est pourquoi on parle “d’équivalent carbone”.
                </Trans>
              </p>

              <p>
                <Trans>
                  Ces émissions proviennent de diverses activités humaines dont
                  les moyens de transport, l’alimentation, le logement, la
                  consommation courante de produits et de services, la
                  production industrielle ainsi que le service public.
                </Trans>
              </p>

              <p className="mb-0">
                <Trans>
                  En quantifiant l’ensemble de ces émissions, l’empreinte
                  carbone permet de mesurer l’impact sur le climat et de mettre
                  en place des stratégies pour réduire ces émissions.
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: <Trans>Comment calculer son empreinte carbone ?</Trans>,
          answer: (
            <>
              <p>
                <Trans>
                  Calculer son empreinte carbone consiste à additionner
                  l’ensemble des gaz à effet de serre émis par ses activités
                  quotidiennes, en tenant compte de plusieurs facteurs comme les
                  déplacements, l’alimentation, le logement et la consommation
                  de biens et services.{' '}
                </Trans>
              </p>

              <p>
                <Trans>
                  Le simulateur en ligne Nos Gestes Climat permet d’estimer
                  votre empreinte écologique, la fois votre empreinte carbone et{' '}
                  <Link href="/empreinte-eau">votre empreinte eau</Link> en
                  moins de 10 minutes.
                </Trans>
              </p>

              <p>
                <Trans>
                  Ces deux indicateurs permettent de mieux comprendre l’impact
                  environnemental de vos choix pour agir de manière plus
                  responsable.
                </Trans>
              </p>

              <p>
                <Trans>
                  L’empreinte carbone n’est pas un bilan carbone. Même s’ils
                  mesurent tous deux les émissions de gaz à effet de serre
                  (GES), ils ne se calculent pas de la même manière et n’ont pas
                  le même objectif.
                </Trans>
              </p>

              <p>
                <Trans>
                  L’empreinte carbone englobe les émissions directes et
                  indirectes d’un individu sur une année. Le bilan carbone, en
                  revanche, est un outil de comptabilité utilisé par les
                  organisations (entreprises, collectivités) pour quantifier
                  leurs émissions sur une période donnée et établir un plan de
                  réduction.
                </Trans>
              </p>

              <p className="mb-0">
                <Trans>
                  La méthodologie du bilan carbone a été développée
                  par l’ADEME (Agence de la transition écologique).
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>
              Quelles sont les principales sources d’émissions de CO2e ?{' '}
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  Les émissions de gaz à effet de serre proviennent de
                  différents secteurs de l’activité humaine. Les principales
                  sources sont :
                </Trans>
              </p>

              <ul className="mb-4 flex list-disc flex-col gap-2 pl-3">
                <li>
                  <Trans>
                    <strong>énergie et production industrielle</strong> : la
                    combustion d’énergies fossiles (charbon, pétrole, gaz
                    naturel) pour produire de l’électricité mais aussi pour
                    alimenter les industries est la première cause d’émissions
                    de CO₂ dans le monde ;
                  </Trans>
                </li>
                <li>
                  <Trans>
                    <strong>transports</strong> : voitures, camions, avions et
                    navires rejettent massivement du CO2 en brûlant des
                    carburants fossiles. La demande croissante de mobilité
                    (voyages et transport de marchandises) accentue ces
                    émissions ;
                  </Trans>
                </li>
                <li>
                  <Trans>
                    <strong>agriculture et élevage</strong> : les pratiques
                    agricoles intensives et l’élevage, en particulier la
                    production de viande et les rejets de méthane des ruminants,
                    contribuent fortement aux gaz à effet de serre, avec un
                    impact significatif sur le changement climatique. L’usage de
                    fertilisants et la déforestation pour l’extension des terres
                    agricoles contribuent également à ces émissions ;
                  </Trans>
                </li>
                <li>
                  <Trans>
                    <strong>logement et consommation énergétique </strong> : le
                    chauffage (et dans une moindre mesure, la climatisation) est
                    le poste le plus important de consommation énergétique du
                    logement, donc d’émission de GES. Il faut également y
                    ajouter les consommations des appareils électroménagers ;
                  </Trans>
                </li>
                <li>
                  <Trans>
                    <strong>
                      production de biens et consommation croissante
                    </strong>{' '}
                    : la fabrication de biens (électronique, vêtements,
                    équipements, loisirs) à travers le monde génère des
                    émissions à chaque étape : extraction des matières
                    premières, production, transport, distribution et
                    élimination. Ces processus contribuent fortement à
                    l’empreinte carbone globale en raison d’une demande toujours
                    croissante.
                  </Trans>
                </li>
              </ul>
            </>
          ),
        },
        {
          question: (
            <Trans>
              Quelle est l’empreinte carbone moyenne d’un Français et celle de
              la France ?{' '}
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  L’empreinte carbone moyenne d’un Français est d’environ 9
                  tonnes de CO2e par an bien au-dessus de l’objectif de 2 tonnes
                  en 2050 par personne par an recommandé par les Nations Unies
                  pour limiter le dérèglement climatique.
                </Trans>
              </p>

              <p>
                <Trans>
                  L’empreinte carbone de la France s’élève 623 millions de
                  tonnes équivalent CO2e par an, selon{' '}
                  <Link
                    target="_blank"
                    rel="noopener"
                    aria-label={t(
                      'les données du Ministère de la Transition Écologique, nouvelle fenêtre'
                    )}
                    href="https://www.statistiques.developpement-durable.gouv.fr/">
                    les données du Ministère de la Transition Écologique
                  </Link>
                  .
                </Trans>
              </p>

              <p className="mb-0">
                <Trans>
                  À l’échelle nationale, la France s’est fixée pour objectif
                  d’atteindre la neutralité carbone d’ici 2050, ce qui implique
                  de réduire drastiquement les émissions dans tous les secteurs.
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>Quels pays émettent le plus de gaz à effet de serre ?</Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  La Chine et les États-Unis sont les deux plus grands émetteurs
                  de gaz à effet de serre en raison de leur forte dépendance aux
                  énergies fossiles (charbon, pétrole, gaz), de leurs industries
                  énergivores ainsi que de la croissance rapide de leurs
                  secteurs de transport et de production manufacturière.
                </Trans>
              </p>

              <p className="mb-0">
                <Trans>
                  La France représente environ 1% des émissions globales mais
                  une partie majeure de son impact est indirecte et liée aux
                  importations de produits fabriqués massivement à l’étranger.
                </Trans>
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
