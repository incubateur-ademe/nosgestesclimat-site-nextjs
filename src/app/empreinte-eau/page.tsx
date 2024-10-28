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
    </LandingPage>
  )
}
