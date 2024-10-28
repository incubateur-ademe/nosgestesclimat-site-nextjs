import DailyGestures from '@/components/landing-pages/DailyGestures'
import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import MotivationSection from '@/components/landing-pages/MotivationSection'
import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import WhatItIs from '@/components/landing-pages/WhatItIs'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import Image from 'next/image'
import WaterFootprintPartners from './_components/WaterFootprintPartners'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t("Calculateur d'empreinte eau personnelle - Nos Gestes Climat"),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte eau.'
    ),
    alternates: {
      canonical: '/empreinte-eau',
    },
  })
}

export default async function WaterFootprintLandingPage() {
  const { t } = await getServerTranslation()

  return (
    <LandingPage
      heroContent={
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl md:text-5xl">
            <Trans>L’empreinte eau, ces litres qu’on ne voit pas !</Trans>
          </h1>
          <p>
            <Trans>
              Calculez votre empreinte eau et découvrez les litres qui se
              cachent dans votre consommation du quotidien.
            </Trans>
          </p>

          <ButtonLink href={getLinkToSimulateur()}>
            <Trans>Passer le test</Trans>
          </ButtonLink>
        </div>
      }
      heroIllustration={
        <Image
          width={500}
          height={500}
          src="/images/illustrations/hero-banner-LP-eau.svg"
          alt=""
        />
      }
      heroPartners={<WaterFootprintPartners />}>
      <WhatItIs
        title={<Trans>Qu'est-ce que l'empreinte eau ?</Trans>}
        description={
          <section>
            <p>
              <Trans>
                <strong className="text-primary-600">L’empreinte eau</strong>{' '}
                correspond à l’ensemble de l’eau douce utilisée pour produire,
                distribuer et traiter en fin de vie des produits, biens ou
                services, que nous consommons au quotidien.
              </Trans>
            </p>

            <p>
              <Trans>
                Cette consommation d’eau, pourtant très importante, est{' '}
                <strong className="text-primary-600">
                  invisible à l’œil nu
                </strong>{' '}
                mais son impact est bien réel.
              </Trans>
            </p>
            <p>
              <Trans>
                Empreinte eau et empreinte carbone sont complémentaires, et les
                comprendre permet d’agir en faveur d’une gestion{' '}
                <strong className="text-primary-600">
                  plus durable des ressources naturelles
                </strong>{' '}
                de la planète.
              </Trans>
            </p>
          </section>
        }
        illustration={
          <Image
            width={500}
            height={500}
            src="/images/illustrations/hero-banner-LP-eau.svg"
            alt=""
          />
        }
      />

      <WhatDoWeMeasure
        title={<Trans>Que calcule-t-on dans l’empreinte eau ?</Trans>}
        listItems={[
          {
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/apple.svg"
                alt=""
              />
            ),
            title: (
              <Trans>
                La culture des fruits, légumes et céréales que nous mangeons
              </Trans>
            ),
          },
          {
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/tee-shirt.svg"
                alt=""
              />
            ),
            title: <Trans>La culture du coton de nos vêtements</Trans>,
          },
          {
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/sheep.svg"
                alt=""
              />
            ),
            title: (
              <Trans>La production d’aliments pour les animaux d’élevage</Trans>
            ),
          },
          {
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/computer.svg"
                alt=""
              />
            ),
            title: <Trans>L'extraction des matériaux pour le numérique</Trans>,
          },
          {
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/electricity.svg"
                alt=""
              />
            ),
            title: <Trans>La production d’électricité</Trans>,
          },
        ]}
        description={
          <>
            <p className="mb-8 text-center">
              <Trans>
                L’empreinte eau,{' '}
                <strong className="text-primary-600">
                  calculée en milliers de litres par jour
                </strong>
                , tient compte de{' '}
                <strong className="text-primary-600">l’eau nécessaire</strong> à
                la production, la distribution et au traitement des biens et
                services consommés. Ce calcul prend également en considération
                <strong className="text-primary-600">le stress hydrique</strong>
                et pondère les consommations d’eau en fonction de{' '}
                <strong className="text-primary-600">
                  la rareté de la ressource
                </strong>{' '}
                dans les territoires concernés. Ainsi, un litre d’eau utilisé en
                France n’aura pas la même valeur qu’un litre d’eau utilisé au
                Maroc.
              </Trans>
            </p>

            <p className="text-center font-bold text-secondary-700">
              <Trans>
                Attention : l’empreinte eau ne tient pas compte de la
                consommation d’eau domestique (douche, toilettes, cuisine,
                arrosage) !
              </Trans>
            </p>
          </>
        }
      />

      <DidYouKnowSlider mode="empreinte-eau" />

      <DailyGestures
        title={
          <Trans>
            Les gestes du quotidien pour préserver nos ressources en eau{' '}
          </Trans>
        }
        description={
          <>
            <p>
              <Trans>
                L’eau est{' '}
                <strong className="text-primary-600">
                  au cœur de nos vies
                </strong>{' '}
                et de notre consommation quotidienne, bien{' '}
                <strong className="text-primary-600">
                  au-delà de ce que nous voyons à la maison
                </strong>
                . Chaque jour, des milliers de litres d’eau sont utilisés pour
                produire les aliments que nous mangeons, les vêtements que nous
                portons et l’énergie que nous consommons.
              </Trans>
            </p>

            <p>
              <Trans>
                Voici quelques exemples de gestes qui auront un impact important
                sur votre consommation eau indirecte :
              </Trans>
            </p>
          </>
        }
        gestures={{
          Alimentation: [
            <Trans key="cuisiner">
              Cuisiner avec des produits locaux et de saison
            </Trans>,
            <Trans key="viande">Réduire la consommation de viande</Trans>,
            <Trans key="eau-du-robinet">Préférer l'eau du robinet</Trans>,
          ],
          Vêtements: [
            <Trans key="textile-durables">
              Opter pour des vêtements durables
            </Trans>,
            <Trans key="fabric">
              Privilégier les matériaux durables (lin, chanvre, laine, et si
              coton : recyclé)
            </Trans>,
            <Trans key="second-hand">
              Privilégier les produits d'occasion
            </Trans>,
          ],
        }}
        illustration={
          <Image
            width={300}
            height={300}
            src="/images/illustrations/girl-cooking.png"
            alt=""
          />
        }
      />

      <UnderstandToAct
        description={
          <p>
            <Trans>
              Mieux comprendre{' '}
              <strong className="text-primary-600">
                notre impact sur les ressources en eau
              </strong>{' '}
              est essentiel pour pouvoir agir efficacement. À travers une série
              d’articles, nous vous proposons des conseils pratiques, des idées
              inspirantes et des informations clés pour{' '}
              <strong className="text-primary-600">
                réduire votre empreinte eau
              </strong>
              .
            </Trans>
          </p>
        }
        posts={[
          {
            category: 'Empreinte eau',
            title: t("Le lexique pour tout comprendre à l'empreinte eau"),
            href: '/blog/lexique-eau-tout-comprendre',
            imageSrc: '/images/blog/philip-junior-mail-arroser-champ.jpg',
          },
          {
            category: 'Empreinte eau',
            title: t(
              'Les 3 réflexes à adopter pour une garde-robe économe en eau'
            ),
            href: '/blog/reflexes-textile-econome-empreinte-eau',
            imageSrc: '/images/blog/priscilla-du-preez-garde-robe.jpg',
          },
          {
            category: 'Empreinte eau',
            title: t(
              "L'empreinte eau : pourquoi et comment avons-nous travaillé"
            ),
            href: '/blog/empreinte-eau-pourquoi-comment',
            imageSrc: '/images/blog/trisha-downing-champ-coton.jpg',
          },
        ]}
      />

      <MotivationSection
        title={
          <Trans>Économiser l’eau, un enjeu de développement durable</Trans>
        }
        description={
          <p>
            <Trans>
              Avec les pressions croissantes exercées par les activités humaines
              et le changement climatique, la gestion durable de l’eau est
              devenue{' '}
              <strong className="text-primary-600">un défi planétaire</strong>.
              Que ce soit pour l’agriculture, l’industrie ou l’usage domestique,
              cette ressource limitée fait face à des menaces importantes.{' '}
              <strong className="text-primary-600">
                Réduire notre consommation d’eau
              </strong>{' '}
              et adopter des pratiques responsables est donc{' '}
              <strong className="text-primary-600">
                nécessaire pour préserver les ressources
              </strong>{' '}
              et répondre aux défis environnementaux mondiaux.
            </Trans>
          </p>
        }
        motivationItems={[
          {
            title: <Trans>Ressources en eau douce limitées</Trans>,
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/water.svg"
                alt=""
              />
            ),
            description: (
              <Trans>
                Bien que l’eau soit abondante sur Terre, seule 1 % de l’eau est
                douce et accessible pour la consommation humaine.
              </Trans>
            ),
          },
          {
            title: <Trans>Pollution des eaux</Trans>,
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/water.svg"
                alt=""
              />
            ),
            description: (
              <Trans>
                Les pratiques agricoles intensives et les rejets industriels
                contaminent les ressources en eau, menacent les écosystèmes et
                notre santé.
              </Trans>
            ),
          },
          {
            title: <Trans>Accès à l'eau</Trans>,
            icon: (
              <Image
                width={50}
                height={50}
                src="/images/icons/water.svg"
                alt=""
              />
            ),
            description: (
              <Trans>
                Les activités humaines perturbent le cycle de l’eau et
                compromettent l’accès à l’eau potable, entraînant conflits,
                perte de biodiversité et déplacements de populations.
              </Trans>
            ),
          },
        ]}
      />
    </LandingPage>
  )
}
