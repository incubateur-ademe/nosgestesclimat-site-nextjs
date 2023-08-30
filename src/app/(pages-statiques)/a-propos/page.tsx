'use client'

import PageLayout from '@/components/layout/PageLayout'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import AboutEn from '@/locales/pages/en-us/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'
// import contentEs from '@/locales/pages/es/CGU.md'
// import contentIt from '@/locales/pages/it/CGU.md'

export default function About() {
  const locale = useLocale()

  const AboutLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: AboutFr,
      'en-US': AboutEn,
    },
    locale: locale ?? '',
  })

  return (
    <PageLayout shouldShowMenu>
      <AboutLocalised />
    </PageLayout>
  )
}
