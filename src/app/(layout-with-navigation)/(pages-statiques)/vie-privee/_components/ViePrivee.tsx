'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import PrivacyEn from '@/locales/pages/en/privacy.mdx'
import PrivacyFr from '@/locales/pages/fr/privacy.mdx'

export default function ViePrivee() {
  const locale = useLocale()

  const DiffuserLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: PrivacyFr,
      en: PrivacyEn,
    },
    locale: locale ?? '',
  })

  return <DiffuserLocalised />
}
