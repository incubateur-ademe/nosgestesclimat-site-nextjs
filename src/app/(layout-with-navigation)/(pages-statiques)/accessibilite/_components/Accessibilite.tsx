'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import accessibilityEn from '@/locales/pages/en/accessibility.mdx'
import accessibilityFr from '@/locales/pages/fr/accessibility.mdx'

export default function Accessibilite() {
  const locale = useLocale()

  const AccessibilityLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: accessibilityFr,
      en: accessibilityEn,
    },
    locale: locale ?? '',
  })

  return <AccessibilityLocalised />
}
