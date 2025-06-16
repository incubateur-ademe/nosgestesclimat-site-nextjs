'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import type { Locale } from '@/i18nConfig'
import Image from 'next/image'

const getLocalisedSrc = (locale: Locale) => {
  switch (locale) {
    case 'en':
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphique_empreinte_eau_en_9f638fe3e3.png'
    case 'es':
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphique_empreinte_eau_es_aef36407c9.png'
    case 'fr':
    default:
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphique_empreinte_eau_fr_de3e685ba4.png'
  }
}

export default function LocalizedCarbonGraphIllustration() {
  const locale = useLocale() as Locale

  const { t } = useClientTranslation()

  return (
    <Image
      src={getLocalisedSrc(locale)}
      alt={t("Graphique de l'empreinte eau")}
      width={300}
      height={300}
    />
  )
}
