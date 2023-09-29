'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'
// import contentEs from '@/locales/pages/es/CGU.md'
// import contentIt from '@/locales/pages/it/CGU.md'

export default function About() {
  const locale = useLocale()

  const AboutLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: AboutFr,
      en: AboutEn,
    },
    locale: locale ?? '',
  })

  return <AboutLocalised />
}
