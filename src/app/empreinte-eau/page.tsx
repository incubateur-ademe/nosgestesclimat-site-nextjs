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
    </LandingPage>
  )
}
