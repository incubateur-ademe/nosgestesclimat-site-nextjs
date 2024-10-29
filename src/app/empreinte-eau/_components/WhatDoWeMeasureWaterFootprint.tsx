import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default async function WhatDoWeMeasureWaterFootprint() {
  return (
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
              Attention : l’empreinte eau ne tient pas compte de la consommation
              d’eau domestique (douche, toilettes, cuisine, arrosage) !
            </Trans>
          </p>
        </>
      }
    />
  )
}
