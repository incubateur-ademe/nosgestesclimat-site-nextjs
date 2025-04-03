'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import Image from 'next/image'

export default function LocalizedCarbonGraphIllustration() {
  const locale = useLocale()
  const { t } = useClientTranslation()

  return (
    <Image
      src={`/images/misc/graphique-empreinte-eau_${locale}.png`}
      alt={t("Graphique de l'empreinte eau")}
      width={300}
      height={300}
      suppressHydrationWarning
    />
  )
}
