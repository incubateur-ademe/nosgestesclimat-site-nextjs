import FAQ from '@/components/landing-pages/FAQ'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function FAQWaterFootprint() {
  const { t } = await getServerTranslation()

  return (
    <FAQ
      subTitle={<Trans>Vos questions sur l'empreinte eau</Trans>}
      questions={[
        {
          question: <Trans>Comment calculer l’empreinte eau ?</Trans>,
          answer: (
            <>
              <p>
                <Trans>
                  Sur le site Nos Gestes Climat, le calcul de l'empreinte eau se
                  fait simultanément avec le calcul de l'empreinte carbone.
                </Trans>
              </p>
              <p>
                <Trans>
                  Au travers du calculateur Nos Gestes Climat, nous calculons la
                  quantité d’eau consommée par chacun de vos usages (achat d’un
                  produit ou aliment, utilisation d’un service, consommations
                  d’énergies).
                </Trans>
              </p>
              <p>
                <Trans>
                  Ainsi, en calculant votre empreinte carbone, vous obtenez
                  également une estimation de votre empreinte eau pour une
                  vision complète de votre impact.
                </Trans>
              </p>
              <p>
                <Trans>
                  Il existe plusieurs méthodes pour calculer une empreinte eau.
                  Chacune présente des avantages, et aucune à ce stade ne permet
                  de saisir toute la complexité de la question des impacts de
                  l’humain sur le cycle de l’eau. Notre choix s’est porté sur{' '}
                  <a
                    href="https://nosgestesclimat.fr/blog/lexique-eau-tout-comprendre"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(
                      "Lire l'article sur la méthode AWARE, nouvelle page"
                    )}>
                    la méthode AWARE
                  </a>
                  , qui permet de valoriser à sa juste mesure le stress hydrique
                  des régions concernées par les consommations d’eau. C’est la
                  méthode recommandée par la convention européenne, et
                  plébiscitée par l’ADEME pour ses calculs d’ACV.
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>
              Pourquoi l'eau domestique n'est-elle pas incluse dans l'empreinte
              eau ?
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  L’eau domestique, celle qui sort de vos robinets pour la
                  douche, la cuisine, le ménage... n'est pas incluse dans
                  l'empreinte eau car elle est en grande majorité restituée dans
                  le même bassin versant après traitement.
                </Trans>
              </p>

              <p>
                <Trans>
                  Une fois utilisée, cette eau est dépolluée puis renvoyée dans
                  les cours d'eau locaux.
                </Trans>
              </p>

              <p>
                <Trans>
                  Ce n’est pas parce qu’elle n’est pas incluse qu’elle n’est pas
                  importante ! Régulièrement, de nombreux territoires français
                  sont soumis à des restrictions d’eau liées à des périodes de
                  sécheresse. Il est important de réduire sa consommation d'eau
                  domestique pour mieux partager cette ressource vitale et
                  limiter les pressions sur les réserves locales.{' '}
                </Trans>
              </p>

              <p>
                <Trans>
                  Pour aller plus loin :{' '}
                  <a
                    href="/blog/lexique-eau-tout-comprendre"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(
                      "Lire l'article sur le lexique pour tout comprendre à l'empreinte eau, nouvelle page"
                    )}>
                    Le lexique pour tout comprendre à l’empreinte eau
                  </a>
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>
              Qu'est-ce que l'eau verte, l'eau bleue et l'eau grise ?
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  Il existe plusieurs distinctions, qui permettent de valoriser
                  les différences qualitatives d’impact de l’humain sur le cycle
                  de l’eau. La couleur de l’eau en est une majeure :
                </Trans>
              </p>
              <ul>
                <li>
                  <Trans>
                    Eau bleue : eau de surface et souterraine prélevée pour
                    l’irrigation, la production industrielle ou l'énergie.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Eau verte : eau de pluie absorbée par les sols, utilisée
                    pour les cultures sans irrigation artificielle.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Eau grise : quantité d’eau nécessaire pour diluer les
                    polluants générés par la production d’un bien ou service.
                  </Trans>
                </li>
              </ul>

              <p>
                <Trans>
                  La méthodologie AWARE que nous utilisons pour calculer
                  l’empreinte eau se concentre sur les prélèvements d’eau, à
                  savoir l’eau bleue. Elle ne tient pas compte de l’eau grise.
                </Trans>
              </p>

              <p>
                <Trans>
                  Pour aller plus loin :{' '}
                  <a
                    href="/blog/lexique-eau-tout-comprendre"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(
                      "Lire l'article sur le lexique pour tout comprendre à l'empreinte eau, nouvelle page"
                    )}>
                    Le lexique pour tout comprendre à l’empreinte eau
                  </a>
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>
              Quels sont les exemples d'empreinte eau de certains produits ?
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  Voici quelques exemples d’empreinte eau pour des produits
                  courants :
                </Trans>
              </p>

              <ul>
                <li>
                  <Trans>
                    Un jean : environ 30 000 litres d’eau, principalement pour
                    la culture du coton.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Un hamburger de bœuf : environ 380 litres d’eau.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Une tasse de café : 64 litres d’eau, de la culture à la
                    transformation.
                  </Trans>
                </li>
                <li>
                  <Trans>Un kilo de riz : 14 000 litres d’eau.</Trans>
                </li>
                <li>
                  <Trans>Un kilo de pommes de terre : 330 litres d’eau.</Trans>
                </li>
                <li>
                  <Trans>
                    Une tablette de chocolat (150g) : 235 litres d’eau.
                  </Trans>
                </li>
                <li>
                  <Trans>Un litre de lait : environ 330 litres d’eau.</Trans>
                </li>
                <li>
                  <Trans>Un œuf : 75 litres d’eau.</Trans>
                </li>
                <li>
                  <Trans>Une baguette de pain : 40 litres d’eau.</Trans>
                </li>
              </ul>

              <p>
                <Trans>
                  De l’eau se cache derrière toutes nos consommations, dans des
                  proportions que nous ne soupçonnons pas toujours !
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>
              Quelle est l'empreinte eau moyenne d'un habitant français ?
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>
                  L’empreinte eau d’un français est de plusieurs milliers de
                  litres par jour : entre 4 et 8000, en moyenne.
                </Trans>
              </p>

              <p>
                <Trans>
                  À la différence de l’empreinte carbone, nous ne disposons pas
                  encore de données consolidées à l’échelle de la France, ni
                  d’objectifs à atteindre. Mais nous avons déjà une vision assez
                  juste des conséquences de notre accaparement de cette
                  précieuse ressource pour l’ensemble du vivant. Nous pouvons
                  agir collectivement pour réduire notre empreinte eau.
                </Trans>
              </p>
            </>
          ),
        },
        {
          question: (
            <Trans>
              L’empreinte eau aboutit-elle aux mêmes conclusions que l’empreinte
              carbone ?
            </Trans>
          ),
          answer: (
            <>
              <p>
                <Trans>Empreinte eau et empreinte carbone se répondent. </Trans>
              </p>

              <p>
                <Trans>
                  Une hausse de 1 degré de la température du globe entraîne une
                  hausse de 7% du taux d’humidité dans l’atmosphère. L’eau
                  s’évapore plus, plus vite, et les phénomènes climatiques
                  violents s’intensifient. Des régions s’assèchent, quand
                  d’autres sont inondées.{' '}
                </Trans>
              </p>

              <p>
                <Trans>
                  Par ailleurs, l’empreinte humaine sur les sols
                  (artificialisation, cultures intensives, déforestation) a
                  réduit fortement leur capacité à absorber et retenir les eaux
                  pluviales. Elle s’évapore trop vite, et n’alimente plus autant
                  les cours d’eau, lacs et nappes phréatiques, qui
                  progressivement s’épuisent.
                </Trans>
              </p>

              <p>
                <Trans>
                  Chaque geste compte pour garantir un accès durable à l'eau
                  pour tous.{' '}
                </Trans>
              </p>

              <p>
                <Trans>
                  Pour réduire son empreinte eau, il est nécessaire de changer
                  nos habitudes quotidiennes.
                </Trans>
              </p>

              <p>
                <Trans>
                  Adopter une alimentation moins gourmande en eau, en consommant
                  moins de viande et en privilégiant les produits locaux et de
                  saison, a également un impact significatif. Enfin, en évitant
                  le gaspillage et en achetant des produits fabriqués de manière
                  durable, on peut contribuer à la préservation des ressources
                  hydriques tout en limitant notre empreinte environnementale.
                </Trans>
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
