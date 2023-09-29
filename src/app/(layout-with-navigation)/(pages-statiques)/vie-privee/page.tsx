'use client'

import PrivacyEn from '@/locales/pages/en/privacy.mdx'
import PrivacyFr from '@/locales/pages/fr/privacy.mdx'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'

export default function Diffuser() {
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
