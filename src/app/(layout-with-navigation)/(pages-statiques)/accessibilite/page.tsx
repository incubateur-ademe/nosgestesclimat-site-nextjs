'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import accessibilityEn from '@/locales/pages/en/accessibility.mdx'
import accessibilityFr from '@/locales/pages/fr/accessibility.mdx'
// import contentEs from '@/locales/pages/es/Accessibility.md'
// import contentIt from '@/locales/pages/it/Accessibility.md'

export default function Accessibility() {
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
