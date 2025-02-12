import WhatItIs from '@/components/landing-pages/WhatItIs'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function WhatItIsCarbon({ locale }: { locale: string }) {
  const { t } = await getServerTranslation(locale)

  return (
    <WhatItIs
      title={<Trans locale={locale}>Qu’est-ce que l’empreinte carbone ?</Trans>}
      description={
        <div>
          <p>
            <Trans locale={locale}>
              <strong className="text-primary-600">L’empreinte carbone</strong>{' '}
              mesure la quantité totale de gaz à effet de serre (GES) émis par
              nos activités sur une année.
            </Trans>
          </p>
          <p>
            <Trans locale={locale}>
              Depuis le siècle dernier,{' '}
              <strong className="text-primary-600">
                la concentration du carbone dans l’atmosphère augmente
              </strong>
              , si bien que le climat subit de graves bouleversements : montée
              des eaux, destruction du vivant, augmentation des températures,
              etc.
            </Trans>
          </p>
          <p className="mb-0">
            <Trans locale={locale}>
              Le consensus scientifique est formel,{' '}
              <strong className="text-primary-600">
                cette augmentation est directement liée aux activités humaines
              </strong>
              . Il est temps de réduire ou de remplacer ces activités émettrices
              !
            </Trans>
          </p>
        </div>
      }
      illustration={
        <Image
          width={450}
          height={450}
          src="/images/illustrations/expliquer-empreinte-carbone.svg"
          className="py-6 md:py-10"
          alt={t(
            "Deux personnes accolées levant le bras en signe de succès, illustrant l'importance du collectif dans la réduction de nos empreintes carbone"
          )}
        />
      }
    />
  )
}
