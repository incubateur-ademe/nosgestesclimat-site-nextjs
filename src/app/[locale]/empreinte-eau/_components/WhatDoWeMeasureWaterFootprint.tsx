import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import Trans from '@/components/translation/trans/TransServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function WhatDoWeMeasureWaterFootprint({
  locale,
}: {
  locale: string
}) {
  const { t } = await getServerTranslation({ locale })

  return (
    <WhatDoWeMeasure
      title={
        <Trans locale={locale}>Que calcule-t-on dans l'empreinte eau ?</Trans>
      }
      listItems={[
        {
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_alimentation_6e24755b91.svg',
            alternativeText: t(
              'Une pomme, symbolisant le lien entre eau et agriculture'
            ),
          },
          title: 'La culture des fruits, légumes et céréales que nous mangeons',
        },
        {
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_textile_79b8884460.svg',
            alternativeText: t(
              "Un tee-shirt, symbolisant la consommation d'eau pour l'industrie textile"
            ),
          },
          title: 'La culture du coton de nos vêtements',
        },
        {
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_agriculture_46d3a0599f.svg',
            alternativeText: t('Un mouton, liant empreinte eau et élevage'),
          },
          title: "La production d'aliments pour les animaux d'élevage",
        },
        {
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_ordinateur_2f234e6e03.svg',
            alternativeText: t(
              "Un ordinateur, illustrant la consommation d'eau par le numérique"
            ),
          },
          title: "L'extraction des matériaux pour le numérique",
        },
        {
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_electricite_9db0c4939f.svg',
            alternativeText: t(
              "Un éclair, symbolisant la production d'électricité"
            ),
          },
          title: "La production d'électricité",
        },
      ]}
      description={
        <>
          <p className="mb-10 text-center">
            <Trans locale={locale}>
              L'empreinte eau,{' '}
              <strong className="text-primary-600">
                calculée en milliers de litres par jour
              </strong>
              , tient compte de{' '}
              <strong className="text-primary-600">l'eau nécessaire</strong> à
              la production, la distribution et au traitement des biens et
              services consommés. Ce calcul prend également en considération{' '}
              <strong className="text-primary-600">le stress hydrique</strong>{' '}
              et pondère les consommations d'eau en fonction de{' '}
              <strong className="text-primary-600">
                la rareté de la ressource
              </strong>{' '}
              dans les territoires concernés.
            </Trans>
          </p>

          <p className="text-secondary-700 mb-0 text-center font-bold">
            <Trans locale={locale}>
              Attention : l'empreinte eau ne tient pas compte de la consommation
              d'eau domestique (douche, toilettes, cuisine, arrosage) !
            </Trans>
          </p>
        </>
      }
    />
  )
}
