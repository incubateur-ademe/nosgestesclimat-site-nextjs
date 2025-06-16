'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { Locale } from '@/i18nConfig'
import Image from 'next/image'

const getLocalisedSrc = (locale: Locale) => {
  switch (locale) {
    case 'en':
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphique_empreinte_carbone_en_73e92afb6f.png'
    case 'es':
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphique_empreinte_carbone_es_d040714df4.png'
    case 'fr':
    default:
      return 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/graphique_empreinte_carbone_fr_5077492f48.png'
  }
}

export default function LocalizedCarbonGraphIllustration() {
  const locale = useLocale() as Locale
  const { t } = useClientTranslation()

  return (
    <Image
      src={getLocalisedSrc(locale)}
      alt={t("Graphique de l'empreinte carbone")}
      width={300}
      height={300}
    />
  )
}
