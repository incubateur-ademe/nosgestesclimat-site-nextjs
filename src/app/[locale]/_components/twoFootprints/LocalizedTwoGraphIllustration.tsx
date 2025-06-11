'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { Locale } from '@/i18nConfig'
import Image from 'next/image'

const getLocalisedSrc = (locale: Locale) => {
  switch (locale) {
    case 'en':
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphiques_empreinte_carbone_eau_en_73dff81136.png'
    case 'es':
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphiques_empreinte_carbone_eau_es_8834a48abe.png'
    case 'fr':
    default:
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphiques_empreinte_carbone_eau_fr_7df50f7102.png'
  }
}

export default function LocalizedTwoGraphsIllustration() {
  const locale = useLocale() as Locale
  const { t } = useClientTranslation()

  return (
    <Image
      src={getLocalisedSrc(locale)}
      className="hidden md:block"
      alt={t("Deux représentations graphiques de l'empreinte carbone et eau")}
      width={600}
      height={800}
    />
  )
}
