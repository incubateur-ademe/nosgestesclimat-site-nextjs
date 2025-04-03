'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import Image from 'next/image'

export default function LocalizedTwoGraphsIllustration() {
  const locale = useLocale()
  const { t } = useClientTranslation()

  return (
    <Image
      src={`/images/misc/graphiques-empreinte-carbone-eau_${locale}.png`}
      className="hidden md:block"
      alt={t("Deux représentations graphiques de l'empreinte carbone et eau")}
      width={600}
      height={800}
      suppressHydrationWarning
    />
  )
}
