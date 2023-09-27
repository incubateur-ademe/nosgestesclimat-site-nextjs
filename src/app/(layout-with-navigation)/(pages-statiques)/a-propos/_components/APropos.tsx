'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import AboutEn from '@/locales/pages/en-us/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'

export default function APropos() {
  const locale = useLocale()

  const AProposLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: AboutFr,
      'en-US': AboutEn,
    },
    locale: locale ?? '',
  })

  return <AProposLocalised />
}
