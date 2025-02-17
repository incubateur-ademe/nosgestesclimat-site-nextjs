import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import TransServer from '@/components/translation/trans/TransServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function WhatDoWeMeasureWaterFootprint({
  locale,
}: {
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <WhatDoWeMeasure
      title={
        <TransServer locale={locale}>
          Que calcule-t-on dans l’empreinte eau ?
        </TransServer>
      }
      listItems={[
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-alimentation.svg"
              alt={t('Une pomme, symbolisant le lien entre eau et agriculture')}
            />
          ),
          title: (
            <TransServer locale={locale}>
              La culture des fruits, légumes et céréales que nous mangeons
            </TransServer>
          ),
        },
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-textile.svg"
              alt={t(
                "Un tee-shirt, symbolisant la consommation d'eau pour l'industrie textile"
              )}
            />
          ),
          title: (
            <TransServer locale={locale}>
              La culture du coton de nos vêtements
            </TransServer>
          ),
        },
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-agriculture.svg"
              alt={t('Un mouton, liant empreinte eau et élevage')}
            />
          ),
          title: (
            <TransServer locale={locale}>
              La production d’aliments pour les animaux d’élevage
            </TransServer>
          ),
        },
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-numerique.svg"
              alt={t(
                "Un ordinateur, illustrant la consommation d'eau par le numérique"
              )}
            />
          ),
          title: (
            <TransServer locale={locale}>
              L'extraction des matériaux pour le numérique
            </TransServer>
          ),
        },
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-electricite.svg"
              alt={t("Un éclair, symbolisant la production d'électricité")}
            />
          ),
          title: (
            <TransServer locale={locale}>
              La production d’électricité
            </TransServer>
          ),
        },
      ]}
      description={
        <>
          <p className="mb-10 text-center">
            <TransServer locale={locale}>
              L’empreinte eau,{' '}
              <strong className="text-primary-600">
                calculée en milliers de litres par jour
              </strong>
              , tient compte de{' '}
              <strong className="text-primary-600">l’eau nécessaire</strong> à
              la production, la distribution et au traitement des biens et
              services consommés. Ce calcul prend également en considération{' '}
              <strong className="text-primary-600">le stress hydrique</strong>{' '}
              et pondère les consommations d’eau en fonction de{' '}
              <strong className="text-primary-600">
                la rareté de la ressource
              </strong>{' '}
              dans les territoires concernés.
            </TransServer>
          </p>

          <p className="text-secondary-700 mb-0 text-center font-bold">
            <TransServer locale={locale}>
              Attention : l’empreinte eau ne tient pas compte de la consommation
              d’eau domestique (douche, toilettes, cuisine, arrosage) !
            </TransServer>
          </p>
        </>
      }
    />
  )
}
